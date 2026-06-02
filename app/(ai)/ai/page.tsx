'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Brain,
  FileText,
  ImageIcon,
  Mic,
  MessageSquare,
  Languages,
  Settings2,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Building2,
  Mail,
  Phone,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper, SectionHeading } from '@/components/shared'
import ComingSoon from '@/components/shared/ComingSoon'
import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

const ACCENT = '#059669'
const LAUNCH_DATE = new Date('2027-01-01T00:00:00')

const aiInquirySchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.enum(['text', 'image', 'audio', 'conversation', 'multilingual', 'custom']),
  primaryLang: z.enum(['en', 'es', 'pt', 'multilingual']),
  volume: z.enum(['under10k', '10k100k', '100k1m', '1mplus', 'unsure']),
  description: z.string().optional(),
})

type AIInquiryData = z.infer<typeof aiInquirySchema>

const ERRORS: Record<string, Record<Locale, string>> = {
  companyName: {
    en: 'Company name is required (min. 2 characters)',
    es: 'El nombre de la empresa es requerido (mín. 2 caracteres)',
  },
  contactName: {
    en: 'Contact name is required',
    es: 'El nombre de contacto es requerido',
  },
  email: {
    en: 'Please enter a valid email address',
    es: 'Ingresa un correo electrónico válido',
  },
  projectType: {
    en: 'Please select a project type',
    es: 'Por favor selecciona un tipo de proyecto',
  },
  primaryLang: {
    en: 'Please select a primary language',
    es: 'Por favor selecciona un idioma principal',
  },
  volume: {
    en: 'Please select an estimated volume',
    es: 'Por favor selecciona un volumen estimado',
  },
}

function fieldError(field: keyof typeof ERRORS, hasError: boolean, locale: Locale): string | null {
  if (!hasError) return null
  return ERRORS[field]?.[locale] ?? 'Required'
}

const AI_SERVICES = [
  {
    Icon: FileText,
    titleEn: 'Text & NLP Annotation',
    titleEs: 'Anotación de Texto y PLN',
    descEn:
      'Named entity recognition, sentiment analysis, text classification, intent labeling, and coreference resolution for your NLP pipelines.',
    descEs:
      'Reconocimiento de entidades, análisis de sentimientos, clasificación de texto, etiquetado de intención y resolución de correferencia para tus modelos de PLN.',
    chipEn: 'NLP / LLMs',
    chipEs: 'PLN / LLMs',
  },
  {
    Icon: ImageIcon,
    titleEn: 'Image & Video Labeling',
    titleEs: 'Etiquetado de Imágenes y Video',
    descEn:
      'Bounding boxes, polygons, semantic segmentation, object detection, and keypoint annotation for computer vision and autonomous systems.',
    descEs:
      'Cuadros delimitadores, polígonos, segmentación semántica, detección de objetos y anotación de puntos clave para visión por computadora.',
    chipEn: 'Computer Vision',
    chipEs: 'Visión por Computadora',
  },
  {
    Icon: Mic,
    titleEn: 'Audio & Speech Transcription',
    titleEs: 'Transcripción de Audio y Voz',
    descEn:
      'High-accuracy transcription, speaker diarization, and phonetic annotation in English, Spanish, and Portuguese for speech recognition models.',
    descEs:
      'Transcripción de alta precisión, diarización de hablantes y anotación fonética en inglés, español y portugués para modelos de reconocimiento de voz.',
    chipEn: 'ASR / TTS',
    chipEs: 'ASR / TTS',
  },
  {
    Icon: MessageSquare,
    titleEn: 'Conversation & Chatbot Data',
    titleEs: 'Datos de Conversación y Chatbot',
    descEn:
      'Curated Q&A pairs, multi-turn dialogue datasets, RLHF preference data, and chatbot training corpora for conversational AI.',
    descEs:
      'Pares de Q&A curados, conjuntos de datos de diálogo multi-turno, datos de preferencia RLHF y corpus de entrenamiento para IA conversacional.',
    chipEn: 'Conversational AI',
    chipEs: 'IA Conversacional',
  },
  {
    Icon: Languages,
    titleEn: 'Multilingual Datasets',
    titleEs: 'Conjuntos de Datos Multilingüe',
    descEn:
      'Fully annotated bilingual and trilingual datasets in EN/ES/PT — translation pairs, cross-lingual classification, and localization QA.',
    descEs:
      'Conjuntos de datos bilingüe y trilingüe completamente anotados en EN/ES/PT — pares de traducción, clasificación entre idiomas y QA de localización.',
    chipEn: 'EN / ES / PT',
    chipEs: 'EN / ES / PT',
  },
  {
    Icon: Settings2,
    titleEn: 'Custom Annotation Projects',
    titleEs: 'Proyectos de Anotación a Medida',
    descEn:
      'Bespoke annotation pipelines designed around your specific model requirements, quality benchmarks, and delivery timelines.',
    descEs:
      'Flujos de anotación a medida diseñados según los requisitos específicos de tu modelo, estándares de calidad y plazos de entrega.',
    chipEn: 'Enterprise',
    chipEs: 'Empresarial',
  },
] as const

function ServicesPreview({ locale }: { locale: Locale }) {
  return (
    <SectionWrapper bg="off-white" id="ai-services">
      <SectionHeading
        label="Our Capabilities"
        labelEs="Nuestras Capacidades"
        headline="Annotation Built for Modern AI."
        headlineEs="Anotación Construida para la IA Moderna."
        subheadline="From raw data to production-ready training sets — we provide the labeled data your models need to perform at scale, across three languages."
        subheadlineEs="De datos en bruto a conjuntos de entrenamiento listos para producción — proporcionamos los datos etiquetados que tus modelos necesitan, en tres idiomas."
        align="center"
        locale={locale}
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {AI_SERVICES.map((service, i) => {
          const Icon = service.Icon
          return (
            <motion.div
              key={service.titleEn}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(5,150,105,0.11)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: `${ACCENT}12`,
                    color: ACCENT,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <span
                  className="font-sans font-semibold"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: '100px',
                    background: `${ACCENT}10`,
                    border: `1px solid ${ACCENT}22`,
                    color: ACCENT,
                  }}
                >
                  {locale === 'es' ? service.chipEs : service.chipEn}
                </span>
              </div>

              <h3
                className="font-display font-bold mb-2"
                style={{ fontSize: '17px', color: 'var(--text-primary)', lineHeight: 1.3 }}
              >
                {locale === 'es' ? service.titleEs : service.titleEn}
              </h3>

              <p
                className="font-sans flex-1"
                style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}
              >
                {locale === 'es' ? service.descEs : service.descEn}
              </p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-sans" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {locale === 'es' ? 'Idiomas de anotación:' : 'Annotation languages:'}
        </span>
        {[
          { code: '🇺🇸', labelEn: 'English', labelEs: 'Inglés' },
          { code: '🇲🇽', labelEn: 'Spanish', labelEs: 'Español' },
          { code: '🇧🇷', labelEn: 'Portuguese', labelEs: 'Portugués' },
        ].map((lang) => (
          <span
            key={lang.labelEn}
            className="inline-flex items-center gap-1.5 font-sans font-semibold px-3 py-1.5 rounded-full"
            style={{
              fontSize: '13px',
              background: `${ACCENT}09`,
              border: `1px solid ${ACCENT}22`,
              color: ACCENT,
            }}
          >
            {lang.code} {locale === 'es' ? lang.labelEs : lang.labelEn}
          </span>
        ))}
        <a
          href="#inquiry"
          className="inline-flex items-center gap-1 font-sans font-semibold text-[13px] hover:underline"
          style={{ color: ACCENT, textDecoration: 'none' }}
        >
          {locale === 'es' ? 'Enviar consulta →' : 'Submit an inquiry →'}
        </a>
      </motion.div>
    </SectionWrapper>
  )
}

function InquirySuccess({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
        className="flex justify-center mb-5"
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '68px',
            height: '68px',
            background: `${ACCENT}12`,
            border: `2px solid ${ACCENT}28`,
          }}
        >
          <CheckCircle2 size={34} strokeWidth={1.5} style={{ color: ACCENT }} />
        </div>
      </motion.div>
      <h4
        className="font-display font-bold"
        style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '10px' }}
      >
        {locale === 'es' ? '¡Consulta Enviada!' : 'Inquiry Received!'}
      </h4>
      <p
        className="font-sans"
        style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          margin: '0 auto 8px',
          lineHeight: '1.6',
        }}
      >
        {locale === 'es'
          ? 'Nuestro equipo de datos revisará tu proyecto y te responderá en menos de 2 días hábiles.'
          : 'Our data team will review your project and get back to you within 2 business days.'}
      </p>
      <p className="font-sans" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        {locale === 'es'
          ? 'Responderemos en inglés, español o portugués según tu preferencia.'
          : "We'll respond in English, Spanish, or Portuguese — your preference."}
      </p>
    </motion.div>
  )
}

function InquiryForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AIInquiryData>({ resolver: zodResolver(aiInquirySchema) })

  const onSubmit = async (data: AIInquiryData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'ai_inquiry', locale }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    cn('input w-full', hasError && 'border-red-400 focus:border-red-500')

  return (
    <SectionWrapper bg="white" id="inquiry">
      <div className="max-w-[700px] mx-auto">
        <SectionHeading
          label="Start a Project"
          labelEs="Iniciar un Proyecto"
          headline="Tell Us About Your Data Needs."
          headlineEs="Cuéntanos Sobre tus Necesidades de Datos."
          subheadline="Share the details of your annotation project and our team will prepare a custom proposal within 2 business days."
          subheadlineEs="Comparte los detalles de tu proyecto de anotación y nuestro equipo preparará una propuesta personalizada en 2 días hábiles."
          align="center"
          locale={locale}
          className="mb-10"
        />

        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              height: '3px',
              background: `linear-gradient(90deg, ${ACCENT}, #34D399)`,
            }}
            aria-hidden="true"
          />

          <div style={{ padding: '36px 40px' }}>
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div key="success" exit={{ opacity: 0 }}>
                  <InquirySuccess locale={locale} />
                </motion.div>
              )}

              {status !== 'success' && (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Nombre de la Empresa *' : 'Company Name *'}
                      </label>
                      <div className="relative">
                        <Building2
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: 'var(--text-muted)' }}
                          aria-hidden="true"
                        />
                        <input
                          {...register('companyName')}
                          type="text"
                          autoComplete="organization"
                          placeholder={locale === 'es' ? 'Tu Empresa S.A.' : 'Acme AI Inc.'}
                          className={cn(inputClass(!!errors.companyName), 'pl-9')}
                        />
                      </div>
                      {errors.companyName && (
                        <p
                          className="font-sans text-[12px] flex items-center gap-1"
                          style={{ color: '#DC2626' }}
                        >
                          <AlertCircle size={11} />
                          {fieldError('companyName', true, locale)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Nombre de Contacto *' : 'Contact Name *'}
                      </label>
                      <input
                        {...register('contactName')}
                        type="text"
                        autoComplete="name"
                        placeholder={locale === 'es' ? 'Ana Rodríguez' : 'Alex Johnson'}
                        className={inputClass(!!errors.contactName)}
                      />
                      {errors.contactName && (
                        <p
                          className="font-sans text-[12px] flex items-center gap-1"
                          style={{ color: '#DC2626' }}
                        >
                          <AlertCircle size={11} />
                          {fieldError('contactName', true, locale)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Correo Electrónico *' : 'Work Email *'}
                      </label>
                      <div className="relative">
                        <Mail
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: 'var(--text-muted)' }}
                          aria-hidden="true"
                        />
                        <input
                          {...register('email')}
                          type="email"
                          autoComplete="email"
                          placeholder={locale === 'es' ? 'tu@empresa.com' : 'you@company.com'}
                          className={cn(inputClass(!!errors.email), 'pl-9')}
                        />
                      </div>
                      {errors.email && (
                        <p
                          className="font-sans text-[12px] flex items-center gap-1"
                          style={{ color: '#DC2626' }}
                        >
                          <AlertCircle size={11} />
                          {fieldError('email', true, locale)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Teléfono (opcional)' : 'Phone (optional)'}
                      </label>
                      <div className="relative">
                        <Phone
                          size={14}
                          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ color: 'var(--text-muted)' }}
                          aria-hidden="true"
                        />
                        <input
                          {...register('phone')}
                          type="tel"
                          autoComplete="tel"
                          placeholder="2125550100"
                          className={cn('input', 'pl-9')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Tipo de Proyecto *' : 'Project Type *'}
                      </label>
                      <select
                        {...register('projectType')}
                        className={inputClass(!!errors.projectType)}
                        style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        <option value="">{locale === 'es' ? '— Seleccionar —' : '— Select —'}</option>
                        <option value="text">{locale === 'es' ? 'Texto y PLN' : 'Text & NLP'}</option>
                        <option value="image">
                          {locale === 'es' ? 'Imagen y Video' : 'Image & Video'}
                        </option>
                        <option value="audio">
                          {locale === 'es' ? 'Audio y Voz' : 'Audio & Speech'}
                        </option>
                        <option value="conversation">
                          {locale === 'es' ? 'Conversación / Chatbot' : 'Conversation / Chatbot'}
                        </option>
                        <option value="multilingual">
                          {locale === 'es' ? 'Datos Multilingüe' : 'Multilingual Dataset'}
                        </option>
                        <option value="custom">
                          {locale === 'es' ? 'Proyecto Personalizado' : 'Custom Project'}
                        </option>
                      </select>
                      {errors.projectType && (
                        <p
                          className="font-sans text-[12px] flex items-center gap-1"
                          style={{ color: '#DC2626' }}
                        >
                          <AlertCircle size={11} />
                          {fieldError('projectType', true, locale)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-sans font-semibold text-[13px]"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {locale === 'es' ? 'Idioma Principal *' : 'Primary Language *'}
                      </label>
                      <select
                        {...register('primaryLang')}
                        className={inputClass(!!errors.primaryLang)}
                        style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        <option value="">{locale === 'es' ? '— Seleccionar —' : '— Select —'}</option>
                        <option value="en">{locale === 'es' ? '🇺🇸 Inglés' : '🇺🇸 English'}</option>
                        <option value="es">{locale === 'es' ? '🇲🇽 Español' : '🇲🇽 Spanish'}</option>
                        <option value="pt">
                          {locale === 'es' ? '🇧🇷 Portugués' : '🇧🇷 Portuguese'}
                        </option>
                        <option value="multilingual">
                          {locale === 'es'
                            ? '🌐 Multilingüe (EN/ES/PT)'
                            : '🌐 Multilingual (EN/ES/PT)'}
                        </option>
                      </select>
                      {errors.primaryLang && (
                        <p
                          className="font-sans text-[12px] flex items-center gap-1"
                          style={{ color: '#DC2626' }}
                        >
                          <AlertCircle size={11} />
                          {fieldError('primaryLang', true, locale)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-sans font-semibold text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {locale === 'es' ? 'Volumen Estimado de Muestras *' : 'Estimated Sample Volume *'}
                    </label>
                    <select
                      {...register('volume')}
                      className={inputClass(!!errors.volume)}
                      style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
                    >
                      <option value="">{locale === 'es' ? '— Seleccionar —' : '— Select —'}</option>
                      <option value="under10k">
                        {locale === 'es' ? 'Menos de 10,000' : 'Under 10,000'}
                      </option>
                      <option value="10k100k">10,000 – 100,000</option>
                      <option value="100k1m">100,000 – 1,000,000</option>
                      <option value="1mplus">
                        {locale === 'es' ? 'Más de 1,000,000' : 'Over 1,000,000'}
                      </option>
                      <option value="unsure">
                        {locale === 'es' ? 'No estoy seguro aún' : 'Not sure yet'}
                      </option>
                    </select>
                    {errors.volume && (
                      <p
                        className="font-sans text-[12px] flex items-center gap-1"
                        style={{ color: '#DC2626' }}
                      >
                        <AlertCircle size={11} />
                        {fieldError('volume', true, locale)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-sans font-semibold text-[13px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {locale === 'es'
                        ? 'Descripción del Proyecto (opcional)'
                        : 'Project Description (optional)'}
                    </label>
                    <textarea
                      {...register('description')}
                      rows={4}
                      placeholder={
                        locale === 'es'
                          ? 'Describe tu caso de uso, modelo de IA, plazos o requisitos especiales…'
                          : 'Describe your use case, AI model, timelines, or any special requirements…'
                      }
                      className="input"
                      style={{ resize: 'vertical', minHeight: '96px' }}
                    />
                  </div>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl"
                        style={{
                          background: 'rgba(220,38,38,0.06)',
                          border: '1px solid rgba(220,38,38,0.2)',
                        }}
                        role="alert"
                      >
                        <AlertCircle
                          size={15}
                          style={{ color: '#DC2626', flexShrink: 0, marginTop: '1px' }}
                        />
                        <p className="font-sans text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                          {locale === 'es'
                            ? 'Algo salió mal. Por favor intenta de nuevo.'
                            : 'Something went wrong. Please try again.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn w-full justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, #34D399)`,
                      boxShadow: `0 4px 16px ${ACCENT}35`,
                      color: '#FFFFFF',
                      opacity: status === 'loading' ? 0.75 : 1,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        {locale === 'es' ? 'Enviando…' : 'Sending…'}
                      </>
                    ) : (
                      <>
                        {locale === 'es' ? 'Enviar Consulta de Proyecto' : 'Submit Project Inquiry'}
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p
                    className="font-sans text-center"
                    style={{ fontSize: '12px', color: 'var(--text-muted)' }}
                  >
                    🔒{' '}
                    {locale === 'es'
                      ? 'Tu información es confidencial. No se comparte con terceros.'
                      : 'Your information is confidential and never shared with third parties.'}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default function AIPage() {
  const { locale } = useLocale()

  return (
    <>
      <ComingSoon
        name="Aventia AI"
        color={ACCENT}
        icon={<Brain size={34} strokeWidth={2} aria-hidden="true" />}
        tagline="Training Data That Powers Real AI."
        taglineEs="Datos de Entrenamiento que Impulsan la IA Real."
        description="Enterprise-grade data annotation in English, Spanish, and Portuguese. We help AI teams build better models with high-quality labeled data at scale."
        descriptionEs="Anotación de datos de nivel empresarial en inglés, español y portugués. Ayudamos a los equipos de IA a construir mejores modelos con datos etiquetados de alta calidad."
        launchDate={LAUNCH_DATE}
        divisionId="ai"
        id="waitlist"
      />

      <ServicesPreview locale={locale} />

      <InquiryForm locale={locale} />
    </>
  )
}
