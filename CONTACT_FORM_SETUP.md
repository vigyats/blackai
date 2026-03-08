# Contact Form Setup Instructions

## Email Configuration

The contact form is configured to send emails to:
- info@blackai.in
- vigyatsingh33@gmail.com

Subject line: "BlackAI - New Contact Form Submission"

## Setup Steps

### Option 1: Web3Forms (Recommended - Free & Easy)

1. Go to https://web3forms.com
2. Sign up for a free account
3. Create a new form and get your Access Key
4. Open `src/pages/Contact.tsx`
5. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key
6. Done! The form will now send emails to both addresses

### Option 2: EmailJS (Alternative)

1. Go to https://www.emailjs.com
2. Sign up and create an email service
3. Install EmailJS: `npm install @emailjs/browser`
4. Configure the service in Contact.tsx

### Option 3: Backend API (Most Reliable)

Create your own backend API endpoint that:
1. Receives the form data
2. Uses a service like SendGrid, Mailgun, or AWS SES
3. Sends emails to both addresses

## Testing

After setup, test the form by:
1. Filling out all fields
2. Clicking "Send Message"
3. Check both email inboxes for the message

## Email Format

The email will include:
- Sender Name
- Sender Email
- Company (if provided)
- Message content
- Subject: "BlackAI - New Contact Form Submission"
