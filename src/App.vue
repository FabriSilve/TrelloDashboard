<template>
  <Page>
    <Card :size="6">Chart 1</Card>
    <Card :size="3">Chart 2</Card>
    <Card :size="3">Chart 3</Card>
    <Card :size="3">Chart 4</Card>
    <Card :size="3">Chart 5</Card>
  </Page>
</template>

<script>
import Menu from './components/layout/Menu';
import Page from './components/layout/Page';
import Card from './components/logic/Card';

export default {
  name: 'App',
  components: {
    Menu,
    Page,
    Card,
  },
}
</script>