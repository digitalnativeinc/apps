import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components';

export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  classNames: 'has-background-primary has-text-white'
};

export const Dark = Template.bind({});
Dark.args = {
  label: 'Button',
  classNames: 'has-background-dark has-text-white'
};

export const Small = Template.bind({});
Small.args = {
  label: 'Button',
  classNames: 'has-background-info has-text-white'
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
  classNames: 'p-4 is-size-6'
};

export const Large = Template.bind({});
Large.args = {
  label: 'Button',
  classNames: 'p-4 is-size-4'
};
