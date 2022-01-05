const sidebarCandidate = [
  {
    title: 'Profile',
    path: '/candidate/profile'
  },
  {
    title: 'Curriculum Vitae',
    path: '#',
    subNav: [
      {
        title: 'Personal Information',
        path: '/candidate/curriculumvitae/personal-information',
        cName: 'nav'
      },
      {
        title: 'Basic Education',
        path: '/candidate/curriculumvitae/basic-education',
        cName: 'nav'
      },
      {
        title: 'College Education & Plus',
        path: '/candidate/curriculumvitae/college-education',
        cName: 'nav'
      },
      {
        title: 'Other Education',
        path: '/candidate/curriculumvitae/other-education',
        cName: 'nav'
      },
      {
        title: 'Work Experience',
        path: '/candidate/curriculumvitae/work-experience',
        cName: 'nav'
      },
      {
        title: 'Hobbies & Skills',
        path: '/candidate/curriculumvitae/hobbies-and-skills',
        cName: 'nav'
      },
      {
        title: 'Time Range',
        path: '/candidate/curriculumvitae/time-range',
        cName: 'nav'
      },
      {
        title: 'Work Profile',
        path: '/candidate/curriculumvitae/work-profile',
        cName: 'nav'
      }
    ]
  },
  {
    title: 'Job Interviews',
    path: '/candidate/profile/job-interviews'
  },
  {
    title: 'Availability',
    path: '/candidate/profile/availability'
  },
  {
    title: 'Job Oportunities',
    path: '/candidate/profile/job-oportunities'
  }
];

const sidebarPsychologist = [
  {
    title: 'Personal Schedule',
    path: '/psychologist/personal-schedule'
  },
  {
    title: 'List of appointments',
    path: '/psychologist/list-of-appointments'
  },
  {
    title: 'Appointments Results',
    path: '/psychologist/appointments-results'
  }
];

const sidebarAdmin = [
  {
    title: 'Admins',
    path: '/admin/admins',
    cName: 'nav'
  },
  {
    title: 'Application',
    path: '/admin/applications',
    cName: 'nav'
  },
  {
    title: 'Companies',
    path: '/admin/companies',
    cName: 'nav'
  },
  {
    title: 'Interviews',
    path: '/admin/interviews',
    cName: 'nav'
  },
  {
    title: 'Positions',
    path: '/admin/positions',
    cName: 'nav'
  },
  {
    title: 'Candidate',
    path: '/admin/candidate',
    cName: 'nav'
  },
  {
    title: 'Profiles',
    path: '/admin/profiles',
    cName: 'nav'
  },
  {
    title: 'Psychologists',
    path: '/admin/psychologists',
    cName: 'nav'
  },
  {
    title: 'Sessions',
    path: '/admin/sessions',
    cName: 'nav'
  },
  {
    title: 'Reports',
    path: '/admin/reports',
    cName: 'nav'
  }
];

export { sidebarCandidate, sidebarPsychologist, sidebarAdmin };
