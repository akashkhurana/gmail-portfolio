import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Email } from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private mockEmails: Email[] = [
    {
      id: '1',
      sender: 'Me (Akash)',
      senderEmail: 'akash@developer.portfolio',
      subject: 'Welcome to this Angular Gmail Clone Portfolio!',
      snippet: 'Thanks for checking out this SPA built with Angular 17, Material Design 3, and NgRx...',
      body: `
        <p><strong>Hi there, thanks for visiting!</strong></p>
        <p>I'm a Frontend Engineer, and this is my interactive portfolio—designed as an exact replica of the modern Gmail interface.</p>
        <p>Rather than a traditional scrolling site, I built this to demonstrate advanced Angular architecture, state management, and pixel-perfect UI replication.</p>
        <p>Feel free to click around the tabs (Primary, Promotions, Social), read the "emails", and explore the responsive sidenav. Here's a quick guide to what you'll find:</p>
        <ul>
          <li><strong>Primary Tab:</strong> My professional experience, education, and architecture notes.</li>
          <li><strong>Promotions Tab:</strong> Featured side projects and technical articles.</li>
          <li><strong>Social Tab:</strong> Links to my GitHub, LinkedIn, and social networks.</li>
        </ul>
        <p>Enjoy exploring the inbox!</p>
      `,
      date: '10:00 AM',
      isStarred: true,
      isRead: false,
      labels: ['Welcome', 'About'],
      techStack: ['Angular 17', 'TypeScript', 'RxJS', 'NgRx'],
      type: 'primary'
    },
    {
      id: '2',
      sender: 'Experience Log',
      senderEmail: 'work@history.log',
      subject: 'Professional Experience: Senior Frontend Engineer',
      snippet: 'Detailed breakdown of my professional roles and achievements...',
      body: `
        <p><strong>Senior Frontend Engineer | Tech Corp Inc.</strong></p>
        <p><em>2021 - Present</em></p>
        <ul>
          <li>Led the migration of a massive monolithic enterprise dashboard to a modular Angular SPA.</li>
          <li>Established comprehensive UI component libraries using Material Design principles.</li>
          <li>Mentored junior developers and instituted rigorous code review standards, reducing production bugs by 35%.</li>
          <li>Implemented complex state management using NgRx, improving application performance and data consistency.</li>
        </ul>
        <br/>
        <p><strong>Frontend Developer | StartUp LLC</strong></p>
        <p><em>2018 - 2021</em></p>
        <ul>
          <li>Developed responsive internal tools using React and Redux.</li>
          <li>Collaborated closely with UX designers to ensure pixel-perfect implementations.</li>
          <li>Integrated RESTful APIs and optimized front-end loading speeds.</li>
        </ul>
      `,
      date: 'Mar 01',
      isStarred: true,
      isRead: true,
      labels: ['Experience', 'Career'],
      techStack: ['Angular', 'NgRx', 'React', 'Redux'],
      type: 'primary'
    },
    {
      id: '3',
      sender: 'System Architect',
      senderEmail: 'arch@angular-gmail.app',
      subject: 'App Documentation: How I built this Gmail Clone',
      snippet: 'Detailed breakdown of the architecture, Material Design 3 CSS, and NgRx state...',
      body: `
        <p><strong>Achieving the Gmail Look and Feel</strong></p>
        <p>Unlike standard Angular Material themes, this application heavily overrides default CSS variables to achieve the exact Google Material 3 aesthetic.</p>
        <ul>
          <li><strong>Color Palette:</strong> Utilizes exact HEX codes like <code>#f6f8fc</code> (background), <code>#c2e7ff</code> (compose button), and <code>#0b57d0</code> (active tabs).</li>
          <li><strong>State Management (NgRx v17):</strong> Uses Actions (e.g., <code>selectTab</code>), Reducers for immutable state transitions, and Memoized Selectors to efficiently filter the email list based on the active tab without redundant processing.</li>
          <li><strong>Responsive Sidenav:</strong> Leverages Angular CDK's <code>BreakpointObserver</code> to seamlessly collapse the sidebar into an expandable <code>over</code> drawer on mobile devices.</li>
          <li><strong>Hover States:</strong> Granular attention was paid to the <code>box-shadow</code> inset and outer properties on the email rows to replicate Gmail's depth natively with SCSS.</li>
        </ul>
      `,
      date: 'Feb 28',
      isStarred: false,
      isRead: true,
      labels: ['Architecture', 'UI/UX'],
      techStack: ['SCSS', 'CSS Variables', 'NgRx Store'],
      type: 'primary'
    },
    {
      id: '4',
      sender: 'University Registrar',
      senderEmail: 'records@university.edu',
      subject: 'Academic Record: B.S. in Computer Science',
      snippet: 'Official transcript and academic achievements overview...',
      body: `
        <p><strong>Degree:</strong> Bachelor of Science in Computer Science</p>
        <p><strong>Graduation:</strong> May 2018</p>
        <p><strong>Focus Areas & Coursework:</strong></p>
        <ul>
          <li>Data Structures & Algorithms</li>
          <li>Web Application Architecture</li>
          <li>Human-Computer Interaction (HCI)</li>
          <li>Database Systems Design</li>
        </ul>
        <p><em>Honors: Dean's List (2016 - 2018)</em></p>
      `,
      date: 'Feb 15',
      isStarred: false,
      isRead: true,
      labels: ['Education', 'Degree'],
      techStack: ['Java', 'C++', 'Python', 'SQL'],
      type: 'primary'
    },
    {
      id: '5',
      sender: 'Project Showcase',
      senderEmail: 'showcase@portfolio.app',
      subject: 'Featured Project: E-Commerce Dashboard Engine',
      snippet: 'A look at one of my favorite side projects built with Next.js and Tailwind...',
      body: `
        <p><strong>The E-Commerce Dashboard Engine</strong></p>
        <p>A full-stack project serving as a highly performant admin panel for modern e-commerce stores.</p>
        <ul>
          <li><strong>Frontend:</strong> Next.js 14 (App Router), React Server Components, Tailwind CSS, Framer Motion.</li>
          <li><strong>Backend:</strong> Node.js, Express, PostgreSQL via Prisma ORM.</li>
          <li><strong>Features:</strong> Real-time sales charts, inventory management, dynamic filtering, and secure JWT authentication.</li>
        </ul>
        <p>Check out the code on my GitHub!</p>
      `,
      date: 'Jan 10',
      isStarred: true,
      isRead: false,
      labels: ['Project', 'Showcase'],
      techStack: ['Next.js', 'React', 'Tailwind', 'Prisma'],
      type: 'promotions'
    },
    {
      id: '6',
      sender: 'Dev Updates',
      senderEmail: 'newsletter@dev.news',
      subject: 'Latest Article: Mastering Angular Component Life Cycles',
      snippet: 'In my latest blog post, we dive deep into ngOnInit, ngOnChanges, and memory management...',
      body: `
        <p><strong>Mastering Angular Component Life Cycles</strong></p>
        <p>Understanding the component lifecycle is crucial for writing performant Angular applications.</p>
        <p>In this article, I cover:</p>
        <ul>
          <li>When exactly to use <code>ngOnInit</code> versus the constructor.</li>
          <li>Optimizing CD (Change Detection) with <code>OnPush</code> strategy and <code>ngOnChanges</code>.</li>
          <li>Preventing memory leaks by cleaning up subscriptions in <code>ngOnDestroy</code>.</li>
        </ul>
        <p>Read the full article on my Medium/Dev.to profile.</p>
      `,
      date: 'Dec 05',
      isStarred: false,
      isRead: true,
      labels: ['Blog', 'Article'],
      techStack: ['Angular', 'Performance'],
      type: 'promotions'
    },
    {
      id: '7',
      sender: 'GitHub Network',
      senderEmail: 'network@github.com',
      subject: 'Let\'s connect and collaborate!',
      snippet: 'Find me on GitHub, LinkedIn, and let\'s build something awesome...',
      body: `
        <p><strong>Connect with me!</strong></p>
        <p>I'm always open to discussing tech, architecture, or interesting project opportunities.</p>
        <ul>
          <li><strong>GitHub:</strong> <a href="#" style="color: #0b57d0; text-decoration: none;">github.com/my-profile</a> - Check out my open source contributions.</li>
          <li><strong>LinkedIn:</strong> <a href="#" style="color: #0b57d0; text-decoration: none;">linkedin.com/in/my-profile</a> - Connect with me professionally.</li>
          <li><strong>Email:</strong> Feel free to use the "Compose" button on the left to send me a direct message!</li>
        </ul>
      `,
      date: 'Nov 20',
      isStarred: true,
      isRead: false,
      labels: ['Social', 'Networking'],
      techStack: ['GitHub', 'LinkedIn', 'Communication'],
      type: 'social'
    }
  ];

  constructor() { }

  getEmails(): Observable<Email[]> {
    return of(this.mockEmails).pipe(delay(500));
  }
}
