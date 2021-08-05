import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Logo } from '../components';

import primaryGray from './assets/img/primary-gray.png';
import primaryNavy from './assets/img/primary-navy.png';
import primaryWhite from './assets/img/primary-white.png';

export default {
  title: 'Example/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const PrimaryGray = Template.bind({});
PrimaryGray.args = {
  src: primaryGray as string,
  width: '500px'
};

export const PrimaryNavy = Template.bind({});
PrimaryNavy.args = {
  src: primaryNavy as string,
  width: '500px'
};

export const PrimaryWhite = Template.bind({});
PrimaryWhite.args = {
  src: primaryWhite as string,
  width: '500px'
};
