import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

def build_pdf(filename="assets/Ram_Sewak_Sharma_Resume.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # 1-page tight layout matching the uploaded resume image
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=22,
        bottomMargin=22
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor("#1e3a8a")   # Professional navy
    text_dark = colors.HexColor("#0f172a")       # Slate 900
    text_muted = colors.HexColor("#475569")      # Slate 600

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=20,
        alignment=TA_CENTER,
        textColor=primary_color
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        alignment=TA_CENTER,
        textColor=text_dark
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=primary_color,
        spaceBefore=3,
        spaceAfter=1
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.2,
        alignment=TA_JUSTIFY,
        textColor=text_dark
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.5,
        textColor=text_dark
    )

    job_meta_style = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10,
        textColor=text_muted
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.7,
        leading=9.8,
        leftIndent=10,
        firstLineIndent=-6,
        textColor=text_dark,
        spaceAfter=1
    )

    story = []

    # 1. Header Name
    story.append(Paragraph("RAM SEWAK SHARMA", name_style))
    story.append(Spacer(1, 2))

    # 2. Contact details
    contact_text = (
        'Rewari, Haryana &nbsp;|&nbsp; +91 9350452428 &nbsp;|&nbsp; '
        '<a href="mailto:kramsewak12345@gmail.com" color="#1e3a8a">kramsewak12345@gmail.com</a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/ram-sewak-sharma-308241256" color="#1e3a8a">linkedin.com/in/ram-sewak-sharma-308241256</a> &nbsp;|&nbsp; '
        '<a href="https://github.com/shubham93-ops" color="#1e3a8a">github.com/shubham93-ops</a>'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))

    # Helper function for section line
    def add_section_header(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=0.8, color=primary_color, spaceAfter=3, spaceBefore=1))

    # 3. PROFESSIONAL SUMMARY
    add_section_header("Professional Summary")
    summary_text = (
        "Cybersecurity professional with hands-on experience in network security, vulnerability assessment (VAPT), "
        "and system hardening across Linux and Windows environments. Skilled in configuring, monitoring, and troubleshooting "
        "security technologies (Nmap, Wireshark, Nessus, Wazuh, Splunk), with a strong foundation in networking fundamentals "
        "(TCP/IP, DNS, HTTP/HTTPS, firewall concepts) and OWASP, NIST, and SANS frameworks. Adaptable, collaborative team player "
        "with strong analytical and communication skills, experienced in translating technical findings into clear guidance for "
        "stakeholders across multiple client engagements. Eager to bring a curious, can-do attitude to cyber defence, application security, "
        "and penetration testing in a fast-evolving threat landscape."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 3))

    # 4. WORK EXPERIENCE
    add_section_header("Work Experience")
    story.append(Paragraph("<b>Cryptus Cyber Security Pvt. Ltd.</b> — Delhi, India", job_title_style))
    story.append(Paragraph("Cyber Security Analyst – SOC & VAPT &nbsp;|&nbsp; November 2025 – Present", job_meta_style))
    story.append(Spacer(1, 1))

    exp_bullets = [
        "• <b>VAPT Across Web, API & Network</b>: Conducted hands-on VAPT across Web, API, and Network environments on <b>5+ client engagements</b>; identified and validated vulnerabilities including SQL Injection, XSS, IDOR, CSRF, and authentication flaws using Burp Suite, SQLMap, and Metasploit following OWASP Top 10 methodology.",
        "• <b>Security Assessments & Hardening</b>: Performed network and mobile application security assessments using Nmap, Wireshark, and Nessus across Linux and Windows environments; identified misconfigurations, open ports, and weak authentication mechanisms, delivering hardening recommendations aligned to NIST and SANS standards.",
        "• <b>CVSS Reporting & PoC Documentation</b>: Produced structured penetration testing reports for client engagements with CVSS-based severity ratings, proof-of-concept (PoC) documentation, and remediation steps, translating technical findings into actionable guidance for technical and non-technical stakeholders.",
        "• <b>Security Auditing</b>: Assisted in scoping and executing company-level security audits for client engagements, coordinating cross-functionally to assess and document security posture per NIST and industry-standard frameworks."
    ]
    for b in exp_bullets:
        story.append(Paragraph(b, bullet_style))
    story.append(Spacer(1, 3))

    # 5. KEY PROJECTS
    add_section_header("Key Projects")
    
    # Project 1
    p1_title = "<b>Browser Pentest Assistant</b> — <i>Python, FastAPI, PySide6, Chrome Extension (Manifest V3), SQLite</i> &nbsp;|&nbsp; <a href='https://github.com/shubham93-ops/BrowserPentestAssistant' color='#1e3a8a'>github.com/shubham93-ops/BrowserPentestAssistant</a>"
    story.append(Paragraph(p1_title, job_title_style))
    story.append(Paragraph("• Built a full-stack web application security testing tool combining a Manifest V3 browser extension, FastAPI backend, and PySide6 desktop interface for real-time HTTP/HTTPS traffic interception, inspection, and security testing workflows.", bullet_style))
    story.append(Paragraph("• Developed testing modules for OWASP Top 10 vulnerability inspection (SQL Injection, XSS, IDOR, Clickjacking), header analysis (HSTS, CSP), and session/token validation.", bullet_style))
    story.append(Spacer(1, 1))

    # Project 2
    p2_title = "<b>GhostTrace — Android Security & Diagnostics</b> (In Progress) — <i>Python, PySide6, ADB, SQLite</i> &nbsp;|&nbsp; <a href='https://github.com/shubham93-ops/GhostTrace' color='#1e3a8a'>github.com/shubham93-ops/GhostTrace</a>"
    story.append(Paragraph(p2_title, job_title_style))
    story.append(Paragraph("• Developing a modular Windows desktop application for Android device management, diagnostics, ADB-based device discovery, wireless debugging, and security auditing (AOSP architecture).", bullet_style))
    story.append(Paragraph("• Built with modular architecture, thread-safe state handling, and secure authentication incorporating PBKDF2-HMAC-SHA256 password hashing. QR-based pairing and screen-mirroring are currently in active refinement.", bullet_style))
    story.append(Spacer(1, 1))

    # Project 3
    p3_title = "<b>Web, API & Network Penetration Testing Lab</b> — <i>Burp Suite, Nmap, SQLMap, Wireshark, Metasploit, Juice Shop, DVWA</i>"
    story.append(Paragraph(p3_title, job_title_style))
    story.append(Paragraph("• Built a controlled offensive security lab using DVWA & OWASP Juice Shop for hands-on Web and API penetration testing; systematically tested SQLi, XSS, CSRF, IDOR, and API flaws using Burp Suite and Metasploit; documented PoC and remediation steps.", bullet_style))
    story.append(Paragraph("• Performed network reconnaissance and traffic analysis using Nmap and Wireshark on simulated network targets; validated 15+ vulnerabilities and misconfigurations, authoring structured remediation recommendations.", bullet_style))
    story.append(Spacer(1, 3))

    # 6. EDUCATION
    add_section_header("Education")
    story.append(Paragraph("<b>Compucom Institute of Information Technology</b> — Jaipur, Rajasthan", job_title_style))
    story.append(Paragraph("Bachelor of Computer Applications (BCA) &nbsp;|&nbsp; 2022 – 2025", job_meta_style))
    story.append(Spacer(1, 3))

    # 7. CERTIFICATIONS & TRAINING
    add_section_header("Certifications & Training")
    certs = [
        "• <b>Honeywell Cybersecurity Training</b> – Certificate of Recognition, <b>Grade A</b> | Honeywell & ICT Academy (with Palo Alto Networks) | Nov 2023",
        "• <b>Cryptus Certified Ethical Hacker (CCEH)</b> – Cryptus Cyber Security Pvt. Ltd.",
        "• <b>Web Application Penetration Tester (WAPT)</b> – Cryptus Cyber Security Pvt. Ltd.",
        "• <b>Cryptus Certified Network Administrator (CCNA)</b> – Cryptus Cyber Security Pvt. Ltd.",
        "• <b>Vulnerability Assessment & Penetration Testing (VAPT)</b> – Cryptus Cyber Security Pvt. Ltd.",
        "• <b>Cryptus Certified API Testing</b> – Cryptus Cyber Security Pvt. Ltd.",
        "• <b>Cryptus Certified Forensics Investigator (CCFI)</b> – Cryptus Cyber Security Pvt. Ltd."
    ]
    for c in certs:
        story.append(Paragraph(c, bullet_style))
    story.append(Spacer(1, 3))

    # 8. TECHNICAL SKILLS
    add_section_header("Technical Skills")
    skills = [
        "<b>Penetration Testing Tools</b>: Burp Suite, Nmap, SQLMap, Metasploit, Wireshark, Gobuster, Dirsearch, Nuclei, Amass, Postman, Kali Linux",
        "<b>Security Domains</b>: Web Application Security, VAPT, API Security, Network Security, Mobile Security, OWASP Top 10, Security Auditing",
        "<b>Vulnerability Testing</b>: SQL Injection, XSS, IDOR, CSRF, Authentication & Authorization Testing, Business Logic Flaws, Security Misconfigurations",
        "<b>SIEM & Monitoring</b>: Splunk, Wazuh, Nessus, OpenVAS, Log Analysis, Incident Triage",
        "<b>Programming & Scripting</b>: Python, Linux, Bash, FastAPI, SQLite, Git & GitHub, Networking (TCP/IP, DNS, HTTP/HTTPS)",
        "<b>Assessment Frameworks</b>: CVSS Scoring, PoC Documentation, Vulnerability Reporting, Security Hardening, NIST Guidelines, SANS Controls"
    ]
    for s in skills:
        story.append(Paragraph(f"• {s}", bullet_style))

    doc.build(story)
    print(f"Resume successfully generated at {filename} (Size: {os.path.getsize(filename)} bytes)")

if __name__ == "__main__":
    build_pdf()
