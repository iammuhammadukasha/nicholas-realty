# Email notifications for contact form

When someone submits the contact form, you can get an email (e.g. to your Gmail) with their name, email, and estate type. The form still saves to Supabase; this only adds a copy to your inbox.

---

## Option 1: Resend (recommended)

Resend is free for 100 emails/day and works well with Gmail.

1. **Sign up:** [resend.com](https://resend.com) → create account.
2. **API key:** Dashboard → **API Keys** → Create → copy the key (starts with `re_`).
3. **Env vars:** In `.env.local` (and in Vercel → Project → Settings → Environment Variables for production) add:
   ```env
   RESEND_API_KEY=re_your_key_here
   CONTACT_NOTIFY_EMAIL=your@gmail.com
   ```
   Use any email you want to receive the notifications (e.g. your Gmail).
4. **Restart / redeploy:** Restart `npm run dev` locally; on Vercel, redeploy after adding the variables.

**Sender address:** By default the email is sent from `onboarding@resend.dev` (Resend’s test domain). To send from your own domain (e.g. `hello@nicholasrealty.com`), add and verify the domain in Resend, then set:
```env
RESEND_FROM=Nicholas Realty <hello@yourdomain.com>
```

---

## Option 2: Gmail SMTP (Nodemailer)

If you prefer to send from your Gmail address, you can use Gmail’s SMTP with an App Password.

1. **Gmail App Password:**
   - Turn on 2-Step Verification: [Google Account → Security](https://myaccount.google.com/security).
   - Then: Security → 2-Step Verification → App passwords → create one for “Mail”.
   - Copy the 16-character password.

2. **Add Nodemailer and env:**
   ```bash
   npm install nodemailer
   ```
   In `.env.local`:
   ```env
   CONTACT_NOTIFY_EMAIL=your@gmail.com
   GMAIL_USER=your@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

3. **Use Nodemailer in the API:** The contact API is currently set up for Resend. To use Gmail instead, you’d replace the Resend call in `src/app/api/contact/route.ts` with a Nodemailer `transporter.sendMail()` that sends to `CONTACT_NOTIFY_EMAIL` using `GMAIL_USER` and `GMAIL_APP_PASSWORD`. If you want this, we can add a small `sendNotificationEmail` variant that uses Nodemailer when `RESEND_API_KEY` is not set.

---

## Summary

| Goal                         | What to set                                      |
|-----------------------------|---------------------------------------------------|
| Get form submissions in Gmail | Use **Resend** with `CONTACT_NOTIFY_EMAIL=your@gmail.com` |
| Send from your own domain   | Verify domain in Resend + set `RESEND_FROM`      |
| Send from Gmail             | Use **Option 2** (Nodemailer + App Password)     |

After setting `RESEND_API_KEY` and `CONTACT_NOTIFY_EMAIL`, submit the form once; you should receive an email with the submission details.
