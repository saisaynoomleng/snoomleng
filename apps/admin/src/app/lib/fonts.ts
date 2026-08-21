import localFont from 'next/font/local';

export const heading = localFont({
  src: [
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Josefin_Slab/static/JosefinSlab-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const body = localFont({
  src: [
    {
      path: '../fonts/Open_Sans/static/OpenSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Open_Sans/static/OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Open_Sans/static/OpenSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Open_Sans/static/OpenSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Open_Sans/static/OpenSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Open_Sans/static/OpenSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});
