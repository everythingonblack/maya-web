'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import cn from '@core/utils/class-names';
import Logo from '@public/newsletter-3.svg'; // Asumsi path logo ini masih benar
import { SubmitHandler } from 'react-hook-form';
import { Button, Input } from 'rizzui';
import { Form } from '@core/ui/form';
import {
  NewsLetterFormSchema,
  newsLetterFormSchema,
} from '@/validators/newsletter.schema'; // Anda mungkin perlu menyesuaikan skema ini

// --- Impor yang Anda minta ---
import UploadButton from '@/app/shared/upload-button';
import FileUpload from '@/app/shared/file-upload';

// ---------------------------------
// --- Komponen Form (Modifikasi) ---
// ---------------------------------

const initialValues = {
  email: '', // Di dunia nyata, ini mungkin akan diubah menjadi 'message'
};

export default function AiChatForm() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<NewsLetterFormSchema> = (data) => {
    console.log('Mengirim pesan:', data);
    setReset(initialValues);
  };

  return (
    <>
      <Form<NewsLetterFormSchema>
        validationSchema={newsLetterFormSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="relative">
            <Input
              placeholder="Ketik pesan Anda..."
              // Menambah padding di kanan untuk memberi ruang bagi 2 tombol
              inputClassName="w-full text-base pr-[180px]"
              size="xl"
              rounded="pill"
              {...register('email')} // Tetap menggunakan 'email' sesuai skema
              error={errors.email?.message}
            />

            {/* Kontainer untuk kedua tombol, diposisikan absolut */}
            <div className="absolute right-1 top-1 flex h-[calc(100%-8px)] items-center space-x-2 pr-1">
              {/* Tombol Upload (Sesuai permintaan Anda) */}
              <UploadButton modalView={<FileUpload />} />

              {/* Tombol Kirim (Sesuai permintaan Anda) */}
              <Button
                type="submit"
                className="text-base font-medium" // Kelas lama tidak lagi diperlukan
                size="lg"
                rounded="pill"
              >
                Kirim
              </Button>
            </div>
          </div>
        )}
      </Form>
      <p className="mt-3 text-center text-sm font-medium text-gray-500 @2xl:mt-4 @2xl:text-base">
        Pesan Anda akan dianalisis oleh AI.
      </p>
    </>
  );
}