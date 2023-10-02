export const authPages = [
    {path: '/authentication/login',linkText: 'Sign In', name:'Login'},
    {path: '/authentication/signup',linkText: 'Sign Up', name:'Signup'},
];
export const ProfilePages = [
  {path: '/profile/settings'},
  {path: '/profile/myprofile'},
  {path: '/profile/editprofile'},
  {path: '/profile/notifications'}
];
export const MessagePages = [
    {path: '/messages/sms', name:'SMS', linkText: 'SMS', icon: 'fa fa-comments'},
    {path: '/messages/emails', name:'Emails',linkText: 'Emails', icon: 'fa fa-envelope'},
];
export const MessageSidePages = MessagePages.filter((page) => {
  return page.name === 'SMS' || 
        page.name === 'Emails';
});
export const BlogPages = [
    {path: '/blogs/blogview',linkText: 'BlogView', icon: 'fa fa-newspaper-o'},
    {path: '/blogs/addblog',linkText: 'AddBlog', icon: '	fa fa-plus-circle'},
];
export const GalleryPages = [
    {path: '/gallery/mediaview',linkText: 'MediaView', icon: 'fa fa-picture-o'},
    {path: '/gallery/addmedia',linkText: 'AddMedia', icon: 'fa fa-plus-square-o'},
];

const icon_dropd= 'fa fa-caret-down';
export const AppPages = [
    {path: '/authentication/login',name:'Login',  linkText: 'Login ' },
    {path: '/authentication/signup', name:'Signup', linkText: 'Sign Up' },
    {path: '/dashboard',name:'Dashboard',linkText: 'Dashboard', icon: 'fa fa-dashboard'},
    {path: '/members',name:'Members',linkText: 'Members', icon: '	fa fa-group'},
    {path: '/members/addscouts',name:'AddScout',linkText: 'Add scouts', icon: 'fa fa-user-plus'},
    {path: '/members/addadults',name:'AddAdult',linkText: 'Add adults', icon: 'fa fa-user-plus'},
    {path: '/activities',name:'Activities',linkText: 'Activities', icon: 'fa fa-calendar'},
    {path: '/activities/addactivity',name:'AddActivity',linkText: 'Add activity', icon: 'fa-plus-circle'},
    {path: '/funding',name:'Funding', linkText: 'Funding', icon: 'fa fa-bar-chart'},
    // Message Dropdwn
    {path: '/messages',name:'Messages', linkText: 'Messages', icon: 'fa fa-comments',icon_drop : icon_dropd, submenu: MessageSidePages},
    {path: '/messages/sms', name:'SMS'},
    {path: '/messages/emails', name:'Emails'},
    {path: '/messages/emails/newemail', name:'NewEmail'},
    //Reports and Partners
    {path: '/reports', name:'Reports', linkText: 'Reports', icon: 'fa fa-files-o'},
    {path: '/reports/addreport',name:'AddReport',  linkText: 'AddReport', icon: 'fa fa-files-o'},
    {path: '/partners', name:'Partners', linkText: 'Partners', icon: 'fa fa-handshake-o'},
    {path: '/partners/addpartners',name:'AddPartners',  linkText: 'Add partners', icon: 'fa-plus-circle'},
    // Blogs Dropdown
    {path: '/blogs',name:'Blogs',linkText: 'Blogs', icon: 'fa fa-laptop',icon_drop : icon_dropd, submenu: BlogPages},
    {path: '/blogs/blogview',name:'BlogView'},
    {path: '/blogs/addblog',name:'AddBlog'},
    // Gallery Dropdown
    {path: '/gallery',name:'Gallery',linkText: 'Gallery', icon: 'fa fa-camera',icon_drop : icon_dropd, submenu: GalleryPages},
    {path: '/gallery/mediaview',name:'MediaView'},
    {path: '/gallery/addmedia',name:'AddMedia'},
    //profile pages
    {path: '/profile',name:'Profile'},
    {path: '/profile/settings',name:'Settings'},
    {path: '/profile/myprofile',name:'MyProfile'},
    {path: '/profile/editprofile',name:'EditProfile'},
    {path: '/profile/notifications',name:'Notifications',}
  ];

export const LogPages = AppPages.filter((page) => {
  return page.name === 'Login' || page.name === 'Signup'
});

export const SidebarPages = [
    {
      menuTitle: 'Main',
      menu: AppPages.filter((page) => {
        return (
          page.name === 'Dashboard' ||
          page.name === 'Members' ||
          page.name === 'Activities' ||
          page.name === 'Funding' ||
          page.name === 'Messages' ||
          page.name === 'Reports' ||
          page.name === 'Partners'
        );
      })
    },
    {
      menuTitle: 'Website',
      menu: AppPages.filter((page) => {
        return (
          page.name === 'Blogs' ||
          page.name === 'Gallery'
        );
      })
    }
  ];


