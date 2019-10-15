<template>
  <div class="landing-accordion">
    <div
      class="accordion-item"
      v-for="item, i in items">
      <div class="accordion-item__summary">
        <div class="accordion-item__bullet" />
        <div class="accordion-item__title">{{item.title}}</div>
        <ChevronIcon
          class="accordion-item__expander"
          role="button"
          @click="toggleOpen(i)"
          v-bind:class="{ 'accordion-item__expander--open': $store.getters.serviceOpenId == i }"/>
      </div>
      <div
        class="accordion-content"
        v-bind:class="{ 'accordion-content--open': $store.getters.serviceOpenId == i }">
        <img class="accordion-content__image" v-bind:src="item.image" v-bind:alt="item.alt" />
        <div class="accordion-content__featured">style featured in image: {{item.featured}}</div>
        <div class="accordion-content__description">{{item.description}}</div>
        <div class="accordion-content__header">style details:</div>
        <div class="accordion-content__detail">
          <div class="accordion-content__detail-header">salon time:</div>
          <div class="accordion-content__detail-text">{{item.time}}</div>
        </div>
        <div class="accordion-content__detail">
          <div class="accordion-content__detail-header">price:</div>
          <div class="accordion-content__detail-text">{{item.price}}</div>
        </div>
        <div class="accordion-content__detail">
          <div class="accordion-content__detail-header">style will last for:</div>
          <div class="accordion-content__detail-text">{{item.lasting}}</div>
        </div>
        <div class="accordion-content__detail" v-if="item.extensions">
          <div class="accordion-content__detail-header">hair extensions:</div>
          <div class="accordion-content__detail-text">{{item.extensions}}</div>
        </div>
        <div class="accordion-content__button">
          <SqButton
            label="I want this! Let’s book<div class='accordion-content__arrow'>→</div>"
            :inverted="true"
            :onClick="handleClick(item.categoryId)"/>
        </div>
        <div class="accordion-content__divider" />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronIcon from '../../../images/chevron.svg'
import SqButton from '../../../common/sq-button.vue'

export default {
  props: ['items'],
  methods: {
    toggleOpen: function(i) {
      if (this.$store.getters.serviceOpenId == i) {
        this.$store.commit('changeServiceOpenId', -1)
      }
      else {
        this.$store.commit('changeServiceOpenId', i)
      }
    },
    handleClick: function(categoryId) {
      return function(e) {
        this.$router.push(
          { name: 'subcategories', params: { categoryId }}
        )
      }
    },
  },
  components: {
    ChevronIcon,
    SqButton,
  },
}
</script>

<style lang="less" scoped>
@import '../../../common/utils.less';

.landing-accordion {
  background-color: @white;
  color: @darkBlue;
  margin-top: 30px;
}

.accordion-item__expander path {
  fill: @darkBlue;
}

.accordion-item__expander {
  padding: 0 10px;
}

.accordion-item__expander--open {
  transform: rotate(90deg);
}

.accordion-item__summary {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.accordion-item__bullet {
  border: 1px solid @darkBlue;
  margin-right: 5px;
}

.accordion-item__title {
  font-family: "Moret", serif;
  font-size: 32px;
  letter-spacing: .8px;
  padding: 0 10px;
}

.accordion-content {
  display: none;
}

.accordion-content--open {
  display: flex;
  flex-direction: column;
}

.accordion-content__image {
 align-self: center;
 width: 70%;
 margin: 40px 0;
}

.accordion-content__featured {
  color: @orange;
  font-family: "TT Commons", sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}

.accordion-content__description {
  font-family: "TT Commons", sans-serif;
  font-size: 18px;
  padding: 10px 0;
}

.accordion-content__header {
  font-family: 'Moret', serif;
  text-transform: capitalize;
  text-decoration: underline;
  font-size: 26px;
  letter-spacing: 0.6px;
  padding: 10px 0;
}

.accordion-content__detail {
  // display: flex;
  font-family: "TT Commons", sans-serif;
  font-size: 18px;
  padding: 10px 0;
}

.accordion-content__detail-header {
  display: inline;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 5px;
}

.accordion-content__detail-text {
  display: inline;
  white-space: pre-wrap;
}

.accordion-content__button {
  align-self: center;
  width: 275px;
  margin: 20px 0px;
}

.accordion-content__divider {
  border-top: 1px solid @darkBlue;
  width: 100%;
  margin: 20px 0;
}
</style>

<style lang="less">
.accordion-content__button {
  // override
  .sqs-block-button.inverted .sqs-block-button-element {
    font-size: 14px;
    letter-spacing: 0.6px;
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 10px 5px;
  }
}

.accordion-content__arrow {
  display: inline;
  font-size: 28px;
  padding-left: 10px;
}
</style>
