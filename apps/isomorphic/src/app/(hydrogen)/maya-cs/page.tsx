'use client'; // Add use client directive

import { useEffect, useState, useMemo } from 'react';

import FeaturedBid from '@/app/shared/project-dashboard/overall-progress';
import AppointmentTodo from '@/app/(hydrogen)/maya-cs/appointment-todo';
import { useSelectedOption } from '@/hooks/use-selected-option';

import WelcomeBanner from './welcome-banner';
import PlatformAccess from './platform-access';
import FleetStatus from './fleet-status';
import ResponseRate from '@/app/(hydrogen)/maya-cs/response-rate';
import SalesReport from '@/app/(hydrogen)/maya-cs/sales-report';
import RevenueExpense from '@/app/(hydrogen)/maya-cs/revenue-expense';

import { getReport1d, getReport7d, getReport30d } from '@/api';

interface ReportDataRow {
    unique_users: number;
    new_users: number;
    returning_users: number;
    total_messages: number;
    total_tokens: number;
    avg_response_time: number | string;
    text_messages: number;
    whatsapp_users: number;
    webchat_users: number;
    webapp_users: number;
}

interface UniversalSummary {
    total_users: number;
    new_users: number;
    return_users: number;
    total_messages: number;
    total_tokens: number;
    avg_response_time: number;
    platform_usage: {
        visual_chat: number;
        whatsapp: number;
        webchat: number;
        webapp: number;
    };
    graph: ReportDataRow[];
}

/* -----------------------------------------------------
   UNIVERSAL ADAPTER — SAME STRUCTURE FOR ALL PERIODS
------------------------------------------------------ */

function buildUniversalSummary(data: ReportDataRow[] = []) {
    return data.reduce(
        (acc, row) => {
acc.total_users += Number(row.unique_users ?? 0);
acc.new_users += Number(row.new_users ?? 0);
acc.return_users += Number(row.returning_users ?? 0);

acc.total_messages += Number(row.total_messages ?? 0);
acc.total_tokens += Number(row.total_tokens ?? 0);

acc.response_times.push(Number(row.avg_response_time ?? 0));

acc.platform_usage.visual_chat += Number(row.text_messages ?? 0);
acc.platform_usage.whatsapp += Number(row.whatsapp_users ?? 0);
acc.platform_usage.webchat += Number(row.webchat_users ?? 0);
acc.platform_usage.webapp += Number(row.webapp_users ?? 0);


            return acc;
        },
        {
            total_users: 0,
            new_users: 0,
            return_users: 0,
            total_messages: 0,
            total_tokens: 0,
            response_times: [] as number[],
            platform_usage: {
                visual_chat: 0,
                whatsapp: 0,
                webchat: 0,
                webapp: 0,
            },
        }
    );
}

function extractSummary(data: ReportDataRow[] = []): UniversalSummary {
    const summary = buildUniversalSummary(data);

    return {
        total_users: summary.total_users,
        new_users: summary.new_users,
        return_users: summary.return_users,
        total_messages: summary.total_messages,
        total_tokens: summary.total_tokens,

        avg_response_time:
            summary.response_times.length === 0
                ? 0
                : summary.response_times.reduce((a, b) => a + b, 0) /
                  summary.response_times.length,

        platform_usage: summary.platform_usage,

        graph: data, // index by index
    };
}

/* -----------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------ */

export default function BiddingDashboard() {
    const { selectedOption } = useSelectedOption();
    const [report1d, setReport1d] = useState<ReportDataRow[] | null>(null);
    const [report7d, setReport7d] = useState<ReportDataRow[] | null>(null);
    const [report30d, setReport30d] = useState<ReportDataRow[] | null>(null);

    console.log('Selected Option in Maya CS Page:', selectedOption);

    useEffect(() => {
        async function fetchData() {
            try {
                if (selectedOption === '1d') {
                    const res = await getReport1d();
                    setReport1d(res);
                } else if (selectedOption === '7d') {
                    const res = await getReport7d();
                    setReport7d(res);
                } else if (selectedOption === '30d') {
                    const res = await getReport30d();
                    setReport30d(res);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        }

        fetchData();
    }, [selectedOption]);

    /* -----------------------------------------------------
       COMPUTED VARIABLES (DISIMPAN SAJA, TIDAK DIPAKAI)
    ------------------------------------------------------ */

    const todayData = useMemo(
        () => (report1d ? extractSummary(report1d) : null),
        [report1d]
    );

    const weeklyData = useMemo(
        () => (report7d ? extractSummary(report7d) : null),
        [report7d]
    );

    const monthlyData = useMemo(
        () => (report30d ? extractSummary(report30d) : null),
        [report30d]
    );

    console.log("Today Data:", todayData);
    console.log("Weekly Data:", weeklyData);
    console.log("Monthly Data:", monthlyData);

    return (
        <div className="grid grid-cols-1 gap-6 @container lg:grid-cols-12">
            <div className="col-span-full flex flex-col gap-6 @5xl:col-span-8 3xl:col-span-9">
                <WelcomeBanner />

                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-4 items-stretch">
                    <PlatformAccess
                        className="w-full h-full justify-between"
                        data={todayData?.platform_usage}
                        summary={{
                            usersToday: todayData?.total_users,
                            messagesToday: todayData?.total_messages,
                            avgResponseTime: todayData?.avg_response_time,
                        }}
                    />
                    <FleetStatus className="w-full h-full justify-between" />
                </div>

                <SalesReport
                    data={report1d || report7d || report30d}
                    className="@4xl:col-span-2 @7xl:col-span-7"
                />
                <RevenueExpense
                    data={report1d || report7d || report30d}
                    className="@3xl/jd:col-span-full @5xl:col-span-7"
                />
                <ResponseRate
                    data={report1d || report7d || report30d}
                    className="col-span-full @4xl:col-span-6 @6xl:col-span-7"
                />
            </div>

            <div className="col-span-full @container/sidebar @5xl:col-span-4 3xl:col-span-3">
                <div className="grid grid-cols-1 gap-6 @2xl/sidebar:grid-cols-2">
                    <FeaturedBid className="order-1" />
                    <AppointmentTodo className="order-2 @2xl/sidebar:order-3" />
                </div>
            </div>
        </div>
    );
}
