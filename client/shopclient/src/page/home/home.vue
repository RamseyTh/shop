<template>
  <div>
    <Top title="The Shop"></Top>
    <div class="content">
      <Banner></Banner>
      <H2 title="New"></H2>
      <Theme></Theme>
      <H2 title="Theme"></H2>
      <ShopItem :shopType="shopType"></ShopItem>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar/tabBar";
import Top from "../../components/top/top";
import Banner from "../../components/banner/banner";
import Theme from "../../components/theme/theme";
import ShopItem from "../../components/shopItem/shopItem";
import H2 from "../../components/h2/h2";
export default {
  name: "Home",
  data() {
    return {
      shopType: ""
    };
  },
  components: {
    Top,
    H2,
    Banner,
    Theme,
    ShopItem,
    TabBar
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>