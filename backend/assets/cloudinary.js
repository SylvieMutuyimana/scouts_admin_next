import {cloudinary_endpoint} from '../endpoints';
export const all_images = {
  'header': {
    'logo' : 'rsa_admin/org_imgs/logo_ci21x2.png',
    'openmenu_arrow' : 'rsa_admin/navigation/openmenu_arrow_w1ulk6.png',
    'closemenu_arrow' : 'rsa_admin/navigation/closemenu_arrow_xttuyx.png'
  },
  'footer':{
    
  },
  'other':{

  },
  'users':{
    'id0439':'', 'id232':''
  }
}

export const cloud_imgs = (link) => {
  return cloudinary_endpoint.url(link)
};
