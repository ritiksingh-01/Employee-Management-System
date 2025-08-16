const employees = [
  {
    id: "E001",
    firstname: "Aarav",
    email: "e001@company.com",
    password: "123",
    taskNumber: { active: 2, newTask: 1, completed: 1, failed: 0 },
    tasks: [
      {
        title: "Prepare sales report",
        description: "Compile and summarize the Q2 sales performance.",
        date: "2025-08-05",
        category: "Reports",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Update CRM",
        description: "Enter the latest customer data from recent campaigns.",
        date: "2025-08-07",
        category: "Data Entry",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Team meeting",
        description: "Discuss project milestones with the marketing team.",
        date: "2025-08-08",
        category: "Meetings",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: "E002",
    firstname: "Priya",
    email: "e002@company.com",
    password: "123",
    taskNumber: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      {
        title: "Inventory audit",
        description: "Check and record warehouse stock levels.",
        date: "2025-08-04",
        category: "Logistics",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Supplier follow-up",
        description: "Call suppliers to confirm shipment dates.",
        date: "2025-08-06",
        category: "Procurement",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Restock supplies",
        description: "Order essential office materials.",
        date: "2025-08-09",
        category: "Office",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Safety inspection",
        description: "Ensure all equipment meets safety standards.",
        date: "2025-08-10",
        category: "Safety",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: "E003",
    firstname: "Vihaan",
    email: "e003@company.com",
    password: "123",
    taskNumber: { active: 2, newTask: 1, completed: 1, failed: 0 },
    tasks: [
      {
        title: "Website bug fix",
        description: "Resolve layout issues on the landing page.",
        date: "2025-08-03",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Backend optimization",
        description: "Improve database query performance.",
        date: "2025-08-07",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Deploy new feature",
        description: "Push the new search filter to production.",
        date: "2025-08-08",
        category: "Deployment",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      }
    ]
  },
  {
    id: "E004",
    firstname: "Ananya",
    email: "e004@company.com",
    password: "123",
    taskNumber: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      {
        title: "Client onboarding",
        description: "Guide new clients through the onboarding process.",
        date: "2025-08-05",
        category: "Customer Service",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Support tickets",
        description: "Respond to pending customer support tickets.",
        date: "2025-08-06",
        category: "Support",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Feedback review",
        description: "Analyze customer feedback for product improvement.",
        date: "2025-08-09",
        category: "Research",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "Update FAQs",
        description: "Add answers to common customer questions.",
        date: "2025-08-10",
        category: "Content",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  },
  {
    id: "E005",
    firstname: "Rohan",
    email: "e005@company.com",
    password: "123",
    taskNumber: { active: 2, newTask: 1, completed: 1, failed: 1 },
    tasks: [
      {
        title: "Social media post",
        description: "Create content for the weekly company post.",
        date: "2025-08-04",
        category: "Marketing",
        active: true,
        newTask: true,
        completed: false,
        failed: false
      },
      {
        title: "Ad campaign setup",
        description: "Launch the Facebook Ads campaign for product launch.",
        date: "2025-08-07",
        category: "Advertising",
        active: true,
        newTask: false,
        completed: false,
        failed: false
      },
      {
        title: "Email newsletter",
        description: "Prepare the monthly company newsletter.",
        date: "2025-08-08",
        category: "Email Marketing",
        active: false,
        newTask: false,
        completed: true,
        failed: false
      },
      {
        title: "SEO audit",
        description: "Analyze website SEO and suggest improvements.",
        date: "2025-08-09",
        category: "SEO",
        active: false,
        newTask: false,
        completed: false,
        failed: true
      }
    ]
  }
];

const admin = [
  {
    id: "A001",
    firstname: "Rajesh",
    email: "admin@company.com",
    password: "123"
  }
];


export const setLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
}

export const getLocalStorage = () => {
    try {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const admin = JSON.parse(localStorage.getItem('admin')) || [];
        return { employees, admin };
    } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return { employees: [], admin: [] };
    }
}