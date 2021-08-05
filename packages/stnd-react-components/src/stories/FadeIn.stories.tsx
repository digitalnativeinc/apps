import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FadeIn, Button } from '../components';

export default {
  title: 'Example/FadeIn',
  component: FadeIn,
} as ComponentMeta<typeof FadeIn>;

const Template: ComponentStory<typeof FadeIn> = (args) => <FadeIn {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: <Button label="button"/>,
    duration: 200
};
