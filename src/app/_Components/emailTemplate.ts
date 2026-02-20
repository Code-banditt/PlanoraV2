// lib/emailTemplates/appointmentConfirmation.ts

export const appointmentHtml = (
  professionalName: string,
  date: string,
  type: string,
  location?: string,
  meetingLink?: string,
  clientName?: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation | Planora</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #f59e0b, #10b981, #3b82f6);
        }
        
        .logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        
        .logo-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .confirmation-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 18px;
            color: #1e293b;
            margin-bottom: 24px;
        }
        
        .appointment-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 28px;
            margin: 28px 0;
            border: 1px solid #e2e8f0;
        }
        
        .appointment-detail {
            display: flex;
            align-items: flex-start;
            margin-bottom: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .appointment-detail:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .detail-icon {
            width: 44px;
            height: 44px;
            background: #e0e7ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            flex-shrink: 0;
        }
        
        .detail-icon.calendar { background: #dbeafe; color: #1d4ed8; }
        .detail-icon.user { background: #f3e8ff; color: #7c3aed; }
        .detail-icon.type { background: #dcfce7; color: #15803d; }
        .detail-icon.location { background: #fef3c7; color: #d97706; }
        .detail-icon.link { background: #e0f2fe; color: #0284c7; }
        
        .detail-content h4 {
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .detail-content p {
            font-size: 16px;
            color: #1e293b;
            font-weight: 500;
        }
        
        .action-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            margin: 10px 5px;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }
        
        .action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
        }
        
        .button-secondary {
            background: #f1f5f9;
            color: #475569;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .button-secondary:hover {
            background: #e2e8f0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }
        
        .footer-links {
            margin-top: 16px;
        }
        
        .footer-link {
            color: #4f46e5;
            text-decoration: none;
            font-size: 14px;
            margin: 0 12px;
        }
        
        .calendar-links {
            margin: 30px 0;
        }
        
        .calendar-link {
            display: inline-flex;
            align-items: center;
            background: #f1f5f9;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            color: #475569;
            font-size: 14px;
            margin: 8px 4px;
        }
        
        .calendar-link i {
            margin-right: 8px;
            font-weight: bold;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 24px;
            }
            
            .header {
                padding: 32px 24px;
            }
            
            .appointment-detail {
                flex-direction: column;
            }
            
            .detail-icon {
                margin-bottom: 12px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Planora</div>
            <div class="logo-subtitle">Professional Network & Booking Platform</div>
            <div class="confirmation-badge">Appointment Confirmed ✓</div>
        </div>
        
        <div class="content">
            <p class="greeting">Dear ${clientName || "Client"},</p>
            <p style="font-size: 16px; color: #475569; margin-bottom: 24px;">
                Your appointment has been successfully scheduled. All details are confirmed and ready to go.
            </p>
            
            <div class="appointment-card">
                <div class="appointment-detail">
                    <div class="detail-icon calendar">
                        📅
                    </div>
                    <div class="detail-content">
                        <h4>Date & Time</h4>
                        <p>${date}</p>
                    </div>
                </div>
                
                <div class="appointment-detail">
                    <div class="detail-icon user">
                        👤
                    </div>
                    <div class="detail-content">
                        <h4>Professional</h4>
                        <p>${professionalName}</p>
                    </div>
                </div>
                
                <div class="appointment-detail">
                    <div class="detail-icon type">
                        🏷️
                    </div>
                    <div class="detail-content">
                        <h4>Appointment Type</h4>
                        <p>${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </div>
                </div>
                
                ${
                  type === "in-person"
                    ? `
                    <div class="appointment-detail">
                        <div class="detail-icon location">
                            📍
                        </div>
                        <div class="detail-content">
                            <h4>Location</h4>
                            <p>${location || "To be confirmed"}</p>
                        </div>
                    </div>
                    `
                    : `
                    <div class="appointment-detail">
                        <div class="detail-icon link">
                            🔗
                        </div>
                        <div class="detail-content">
                            <h4>Meeting Link</h4>
                            <p><a href="${meetingLink}" style="color: #4f46e5; text-decoration: none;">Click to join meeting</a></p>
                        </div>
                    </div>
                    `
                }
            </div>
            
            <div style="text-align: center; margin: 32px 0;">
                <a href="https://planora.app/dashboard/appointments" class="action-button">
                    View in Dashboard
                </a>
                
                ${
                  type === "online" && meetingLink
                    ? `<a href="${meetingLink}" class="action-button button-secondary">
                        Join Meeting Now
                    </a>`
                    : ""
                }
            </div>
            
            <div class="calendar-links">
                <p style="text-align: center; color: #64748b; font-size: 14px; margin-bottom: 16px;">
                    Add to your calendar:
                </p>
                <div style="text-align: center;">
                    <a href="#" class="calendar-link">📅 Google Calendar</a>
                    <a href="#" class="calendar-link">📅 Outlook</a>
                    <a href="#" class="calendar-link">📅 iCal</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                Need to make changes? You can reschedule or cancel your appointment up to 24 hours in advance.
            </p>
            <div class="footer-links">
                <a href="https://planora.app/support" class="footer-link">Help Center</a>
                <a href="https://planora.app/contact" class="footer-link">Contact Support</a>
                <a href="https://planora.app/terms" class="footer-link">Terms & Privacy</a>
            </div>
            <p class="footer-text" style="margin-top: 24px;">
                © ${new Date().getFullYear()} Planora. All rights reserved.<br>
                123 Business Ave, Suite 100, San Francisco, CA 94107
            </p>
        </div>
    </div>
</body>
</html>
`;

// lib/emailTemplates/professionalNotification.ts

export const professionalNotificationHtml = (
  professionalName: string,
  clientName: string,
  service: string,
  date: string,
  type: "in-person" | "online",
  location?: string,
  meetingLink?: string,
  clientEmail?: string,
  clientPhone?: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment | Planora</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .header {
            background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #f59e0b, #10b981, #3b82f6);
        }
        
        .logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        
        .notification-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 50px;
            margin-top: 16px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 18px;
            color: #1e293b;
            margin-bottom: 24px;
        }
        
        .booking-card {
            background: #f0f9ff;
            border-radius: 12px;
            padding: 28px;
            margin: 28px 0;
            border: 1px solid #bae6fd;
        }
        
        .booking-detail {
            display: flex;
            align-items: flex-start;
            margin-bottom: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .booking-detail:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .booking-icon {
            width: 44px;
            height: 44px;
            background: #e0f2fe;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            flex-shrink: 0;
        }
        
        .booking-content h4 {
            font-size: 14px;
            color: #64748b;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .booking-content p {
            font-size: 16px;
            color: #1e293b;
            font-weight: 500;
        }
        
        .client-info {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            margin: 24px 0;
        }
        
        .client-info h3 {
            font-size: 16px;
            color: #334155;
            margin-bottom: 16px;
            font-weight: 600;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
        }
        
        .info-item {
            font-size: 14px;
        }
        
        .info-item strong {
            color: #64748b;
            font-weight: 500;
        }
        
        .action-buttons {
            display: flex;
            gap: 12px;
            margin: 32px 0;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 14px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(15, 118, 110, 0.3);
        }
        
        .btn-secondary {
            background: #f1f5f9;
            color: #475569;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .btn-secondary:hover {
            background: #e2e8f0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }
        
        .reminder {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            border-radius: 10px;
            padding: 20px;
            margin: 24px 0;
            color: #92400e;
        }
        
        .reminder h4 {
            font-size: 15px;
            margin-bottom: 8px;
            color: #d97706;
        }
        
        @media (max-width: 600px) {
            .content {
                padding: 24px;
            }
            
            .header {
                padding: 32px 24px;
            }
            
            .booking-detail {
                flex-direction: column;
            }
            
            .booking-icon {
                margin-bottom: 12px;
            }
            
            .action-buttons {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Planora</div>
            <div class="notification-badge">New Appointment Booked</div>
        </div>
        
        <div class="content">
            <p class="greeting">Dear ${professionalName},</p>
            <p style="font-size: 16px; color: #475569; margin-bottom: 24px;">
                You have a new appointment booking. Please review the details below.
            </p>
            
            <div class="booking-card">
                <div class="booking-detail">
                    <div class="booking-icon">
                        📅
                    </div>
                    <div class="booking-content">
                        <h4>Appointment Time</h4>
                        <p>${date}</p>
                    </div>
                </div>
                
                <div class="booking-detail">
                    <div class="booking-icon">
                        👤
                    </div>
                    <div class="booking-content">
                        <h4>Client</h4>
                        <p>${clientName}</p>
                    </div>
                </div>
                
                <div class="booking-detail">
                    <div class="booking-icon">
                        💼
                    </div>
                    <div class="booking-content">
                        <h4>Service</h4>
                        <p>${service}</p>
                    </div>
                </div>
                
                <div class="booking-detail">
                    <div class="booking-icon">
                        🏷️
                    </div>
                    <div class="booking-content">
                        <h4>Type</h4>
                        <p>${type === "online" ? "Online Meeting" : "In-Person"}</p>
                    </div>
                </div>
                
                ${
                  type === "in-person"
                    ? `
                    <div class="booking-detail">
                        <div class="booking-icon">
                            📍
                        </div>
                        <div class="booking-content">
                            <h4>Location</h4>
                            <p>${location || "To be confirmed"}</p>
                        </div>
                    </div>
                    `
                    : `
                    <div class="booking-detail">
                        <div class="booking-icon">
                            🔗
                        </div>
                        <div class="booking-content">
                            <h4>Meeting Link</h4>
                            <p><a href="${meetingLink}" style="color: #0891b2; text-decoration: none;">${meetingLink}</a></p>
                        </div>
                    </div>
                    `
                }
            </div>
            
            <div class="client-info">
                <h3>Client Information</h3>
                <div class="info-grid">
                    ${clientEmail ? `<div class="info-item"><strong>Email:</strong><br>${clientEmail}</div>` : ""}
                    ${clientPhone ? `<div class="info-item"><strong>Phone:</strong><br>${clientPhone}</div>` : ""}
                </div>
            </div>
            
            <div class="reminder">
                <h4>Important Reminder</h4>
                <p style="font-size: 14px;">
                    Please confirm this appointment within 24 hours. If you need to reschedule or decline, 
                    do so at least 48 hours before the scheduled time to avoid cancellation fees.
                </p>
            </div>
            
            <div class="action-buttons">
                <a href="https://planora.app/dashboard/appointments" class="btn btn-primary">
                    View in Dashboard
                </a>
                <a href="https://planora.app/dashboard/calendar" class="btn btn-secondary">
                    Open Calendar
                </a>
                ${
                  type === "online" && meetingLink
                    ? `<a href="${meetingLink}" class="btn btn-secondary">
                        Test Meeting Link
                    </a>`
                    : ""
                }
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                This is an automated notification. Please do not reply to this email.<br>
                For assistance, visit your <a href="https://planora.app/dashboard" style="color: #0891b2;">dashboard</a> 
                or contact <a href="mailto:support@planora.app" style="color: #0891b2;">support@planora.app</a>
            </p>
            <p class="footer-text" style="margin-top: 16px;">
                © ${new Date().getFullYear()} Planora. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`;
