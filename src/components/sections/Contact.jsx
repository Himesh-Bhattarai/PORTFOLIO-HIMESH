'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  const contact = {
    email: data?.email || "",
    phone: data?.phone || "",
    location: data?.location || "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Portfolio contact from ${form.name}`,
          message: form.message,
        }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to send message.');
      }

      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="px-6 lg:px-12 xl:px-16 py-20 bg-[--panel] text-[--page-fg]">
      <div className="max-w-[1440px] mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="space-y-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[--line] bg-[--chip-bg] px-3 py-1 text-xs font-mono text-[--muted]">
            Let's Connect
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Have an idea or an opportunity? Let's talk.</h2>
          <p className="text-[--muted] max-w-xl">
            Whether it's a full-time role, freelance project, or collaboration, I'd love to hear about it. I'll get back to you as soon as I can.
          </p>

          <div className="space-y-3 text-sm text-[--muted]">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[--accent]" />
                <a href={`mailto:${contact.email}`} className="hover:text-[--page-fg]">{contact.email}</a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[--accent]" />
                <a href={`tel:${contact.phone}`} className="hover:text-[--page-fg]">{contact.phone}</a>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[--accent]" />
                <span>{contact.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[--line] bg-[--card] p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] focus-visible:ring-[--accent]"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] focus-visible:ring-[--accent]"
            />
            <Textarea
              name="message"
              placeholder="Tell me about your project, opportunity, or question..."
              value={form.message}
              onChange={handleChange}
              required
              className="bg-transparent border-[--line] min-h-[140px] focus-visible:ring-[--accent]"
            />
            <div className="flex items-center justify-between gap-3">
              <Button type="submit" className="gap-2" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                {status !== 'sending' && <ArrowRight className="h-4 w-4" />}
              </Button>
              {status === 'sent' && (
                <span className="text-xs text-[--accent]">Sent — I'll reply shortly.</span>
              )}
              {status === 'error' && (
                <span className="text-xs text-red-400">{errorMessage}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
