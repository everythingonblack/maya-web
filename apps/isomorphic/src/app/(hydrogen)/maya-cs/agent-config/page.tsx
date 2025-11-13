'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input, Title, Text, Switch, ActionIcon } from 'rizzui';
import cn from '@core/utils/class-names';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';

import { SubmitHandler, Controller } from 'react-hook-form';
import { Form } from '@core/ui/form';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@core/components/form-footer';

import ModalButton from '@/app/shared/modal-button';
import ConnectWhatsappModal from '@/app/shared/connect-whatsapp';

import AndroidIcon from '@core/components/icons/android';
import WebAppIcon from '@core/components/icons/webApp';
import WebIcon from '@core/components/icons/web';
import WhatsappIcon from '@core/components/icons/whatsapp';
import TelegramIcon from '@core/components/icons/telegram';
import InstagramIcon from '@core/components/icons/instagram';
import TikTokIcon from '@core/components/icons/tiktok';
import { FaQrcode } from 'react-icons/fa';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), { ssr: false });
const UploadZone = dynamic(() => import('@core/ui/file-upload/upload-zone'), { ssr: false });

// Placeholder form types and schema
type PersonalInfoFormTypes = {
  first_name: string;
  last_name: string;
  bio: string;
  portfolios: any[];
};

const defaultValues: PersonalInfoFormTypes = {
  first_name: '',
  last_name: '',
  bio: '',
  portfolios: [],
};

const personalInfoFormSchema = {}; // Ganti dengan schema validasi sesungguhnya

const onSubmit = (data: any) => {
  console.log('Form submitted:', data);
};

export const teams = [
  {
    name: 'WhatsApp',
    icon: <WhatsappIcon className="h-9 w-9" />,
    content: 'Aktifkan atau non-aktifkan saluran chatbot via WhatsApp.',
    isAvailable: true,
    isActive: true,
    child: (
      <ModalButton
        label="Hubungkan WhatsApp"
        view={<ConnectWhatsappModal />}
        className="px-3 py-1 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700"
        icon={<FaQrcode className="mr-1" />}
      />
    ),
  },
  {
    name: 'Mayagen Visual WEB',
    icon: <WebIcon className="h-9 w-9" />,
    content: 'Aktifkan atau non-aktifkan saluran chatbot visual via Web App.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Mayagen Visual APK',
    icon: <AndroidIcon className="h-9 w-9" />,
    content: 'Aktifkan atau non-aktifkan saluran chatbot visual via Maya APK.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Web APP',
    icon: <WebIcon className="h-9 w-9" />,
    content: 'Aktifkan atau non-aktifkan saluran chatbot via Web App.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Web Chat',
    icon: <WebAppIcon className="h-9 w-9" />,
    url: 'https://figma.com/redQ',
    moreInfo: 'Kunjungi Website',
    content: 'Aktifkan atau non-aktifkan saluran chatbot via Web Chat.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Mobile App',
    icon: <AndroidIcon className="h-9 w-9" />,
    url: 'https://figma.com/redQ',
    moreInfo: 'Download APK',
    content: 'Aktifkan atau non-aktifkan saluran chatbot via Maya APK.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Telegram',
    icon: <TelegramIcon className="h-9 w-9" />,
    url: 'https://figma.com/redQ',
    moreInfo: 'Kunjungi saluran Telegram',
    content:
      'Aktifkan atau non-aktifkan saluran chatbot via Telegram.',
    isAvailable: true,
    isActive: true
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon className="h-9 w-9" />,
    content:
      'Aktifkan atau non-aktifkan saluran chatbot via Instagram.',
    isAvailable: false,
    isActive: false
  },
  {
    name: 'TikTok',
    icon: <TikTokIcon className="h-9 w-9" />,
    content:
      'Aktifkan atau non-aktifkan saluran chatbot via TikTok.',
    isAvailable: false,
    isActive: false
  },
];


export default function IntegrationSettingsView() {
  const [showBanner, setShowBanner] = useState(true);
  const [highlightTeams, setHighlightTeams] = useState<string[]>([]);

  const handleActivatePromo = () => {
    // Highlight kedua tim
    setHighlightTeams(['Mayagen Visual WEB', 'Mayagen Visual APK']);

    // Hapus highlight setelah 4 detik
    setTimeout(() => setHighlightTeams([]), 2000);
  };

  return (
    <div className="@container">
      {showBanner && <PromoBanner className="mt-10" onClose={setShowBanner} onActivate={handleActivatePromo}/>}

      {/* Placeholder Form */}
      <Form<PersonalInfoFormTypes>
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{ mode: 'onChange', defaultValues }}
      >
        {({ register, control, setValue, getValues, formState: { errors } }) => (
          <>
            <FormGroup
              title="Karakter Dasar Agent"
              description="Konfigurasi karakter dasar untuk asisten virtual AI Anda."
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="Nama Depan"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Nama Belakang"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup
                title="Persona Karakter"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup>
            </div>

            <FormFooter
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        )}
      </Form>


      <HorizontalFormBlockWrapper
        title="Saluran"
        description="Konfigurasi saluran yang cocok untuk layanan AI anda."
      >
      </HorizontalFormBlockWrapper>

      <div className="flex flex-col">
        {teams.map((currentTeam, index) => (
          <div
            key={`team-${index}`}
            className={cn(
              'col-span-2 my-3 flex gap-3 rounded-lg border border-muted p-6 sm:my-4 transition-all',
              !currentTeam.isAvailable && 'opacity-50',
              highlightTeams.includes(currentTeam.name) && 'border-yellow-400 bg-yellow-50'
            )}
            >
            <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden">
              {currentTeam.icon}
            </div>
            <div className="flex flex-grow flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Title as="h3" className="mb-1 text-base font-semibold">
                  {currentTeam.name}
                </Title>
                <Text className="text-sm text-gray-500 transition-colors">
                  {currentTeam.content}
                </Text>
                {currentTeam.url && (
                  <a
                    href={currentTeam.url}
                    target={'_blank'}
                    rel={'noopener noreferrer nofollow noindex'}
                    className="mt-3 inline-block w-auto flex-shrink-0 justify-start p-0 text-xs font-medium capitalize text-gray-900 sm:justify-center"
                  >
                    {currentTeam.moreInfo || 'Learn More'}
                  </a>
                )}

                {/* Tampilkan childButton jika ada */}
                {currentTeam.child && <div className="mt-3">{currentTeam.child}</div>}
              </div>
            </div>
            <Switch checked={currentTeam.isActive} disabled={!currentTeam.isAvailable} variant="flat" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PromoBanner({
  className,
  onClose,
  onActivate,
}: {
  className?: string;
  onClose: (value: boolean) => void;
  onActivate?: () => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center overflow-hidden rounded-xl border border-muted xs:flex-row',
        className
      )}
    >
      <div className="relative h-full min-h-[200px] w-full sm:max-w-[223px]">
        <Image
          className="aspect-[223/170] rounded-t-xl object-cover xs:rounded-none xs:rounded-s-xl"
          src="/maya.png"
          alt="promo"
          fill
        />
      </div>

      <div className="flex flex-col justify-between p-5 pb-6 sm:p-6">
        <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900">
          Update Terbaru Telah Hadir!
        </h5>
        <p className="mb-5 text-sm font-normal text-gray-500">
          Kenalkan, Maya – Asisten Virtual Visual terbaru kami.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="solid" onClick={onActivate} className="w-full sm:w-auto">
            Aktifkan
          </Button>
        </div>
      </div>
      <ActionIcon
        variant="outline"
        rounded="full"
        className="absolute right-5 top-5"
        onClick={() => onClose(false)}
      >
        <PiX className="h-5 w-5" />
      </ActionIcon>
    </div>
  );
}

function HorizontalFormBlockWrapper({
  title,
  titleClassName,
  description,
  children,
  className,
}: React.PropsWithChildren<{
  title: React.ReactNode;
  description?: React.ReactNode;
  titleClassName?: string;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        'pb-3 pt-9 @2xl:grid @2xl:grid-cols-6 @2xl:pt-11',
        className
      )}
    >
      <div className="col-span-2 mb-6 @5xl:mb-0">
        <Title as="h6" className={cn('text-xl font-semibold', titleClassName)}>
          {title}
        </Title>
        <Text className="mt-1 text-sm text-gray-500">{description}</Text>
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
