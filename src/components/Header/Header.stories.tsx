// eslint-disable-next-line import/named
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
// import { ComponentMeta, ComponentStory } from '@storybook/react'
import Header from './Header'

export default {
  title: 'Components/Header',
  component: Header
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
