<template>
  <div class="landing-accordion">
    <div class="accordion-item" v-for="(item, i) in items">
      <div class="accordion-item__summary" @click="toggleOpen(i)" role="button">
        <div class="accordion-item__bullet" :class="`icon--${item.icon}`" />
        <div
          class="accordion-item__title"
          v-bind:class="{
            'accordion-item__title--open': $store.getters.serviceOpenId == i,
          }"
        >
          {{ item.title }}
        </div>
        <ChevronIcon
          class="accordion-item__expander"
          v-bind:class="{
            'accordion-item__expander--open': $store.getters.serviceOpenId == i,
          }"
        />
      </div>
      <div
        class="accordion-content"
        v-bind:class="{
          'accordion-content--open': $store.getters.serviceOpenId == i,
        }"
      >
        <div class="accordion-content__image-container">
          <img
            class="accordion-content__image"
            v-bind:src="item.image"
            v-bind:alt="item.alt"
          />
          <div class="accordion-content__featured">
            style featured in image: {{ item.featured }}
          </div>
        </div>
        <div class="accordion-content__container">
          <div class="accordion-content__description">
            {{ item.description }}
          </div>
          <div class="accordion-content__header">style details:</div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">salon time:</div>
            <div class="accordion-content__detail-text">{{ item.time }}</div>
          </div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">price:</div>
            <div class="accordion-content__detail-text">{{ item.price }}</div>
          </div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">
              style will last for:
            </div>
            <div class="accordion-content__detail-text">{{ item.lasting }}</div>
          </div>
          <div class="accordion-content__detail" v-if="item.extensions">
            <div class="accordion-content__detail-header">hair extensions:</div>
            <div class="accordion-content__detail-text">
              {{ item.extensions }}
            </div>
          </div>
          <div class="accordion-content__button">
            <SqButton
              label="I want this! Let’s book<div class='accordion-content__arrow'>→</div>"
              :inverted="true"
              :onClick="handleClick(item.categoryId)"
            />
          </div>
          <div class="accordion-content__divider" />
        </div>
      </div>
      <div
        class="accordion-item__summary--large"
        @click="openHighlighted(i)"
        role="button"
      >
        <div class="accordion-item__bullet" :class="`icon--${item.icon}`" />
        <div
          class="accordion-item__title"
          v-bind:class="{ 'accordion-item__title--open': isLargeOpen(i) }"
        >
          {{ item.title }}
        </div>
      </div>
      <div
        class="accordion-content"
        v-bind:class="{ 'accordion-content--open-large': isLargeOpen(i) }"
      >
        <div class="accordion-content__image-container">
          <img
            class="accordion-content__image"
            v-bind:src="item.image"
            v-bind:alt="item.alt"
          />
          <div class="accordion-content__featured">
            style featured in image: {{ item.featured }}
          </div>
        </div>
        <div class="accordion-content__container">
          <div class="accordion-content__description">
            {{ item.description }}
          </div>
          <div class="accordion-content__header">style details:</div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">salon time:</div>
            <div class="accordion-content__detail-text">{{ item.time }}</div>
          </div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">price:</div>
            <div class="accordion-content__detail-text">{{ item.price }}</div>
          </div>
          <div class="accordion-content__detail">
            <div class="accordion-content__detail-header">
              style will last for:
            </div>
            <div class="accordion-content__detail-text">{{ item.lasting }}</div>
          </div>
          <div class="accordion-content__detail" v-if="item.extensions">
            <div class="accordion-content__detail-header">hair extensions:</div>
            <div class="accordion-content__detail-text">
              {{ item.extensions }}
            </div>
          </div>
          <div class="accordion-content__button">
            <SqButton
              label="I want this! Let’s book<div class='accordion-content__arrow'>→</div>"
              :inverted="true"
              :onClick="handleClick(item.categoryId)"
            />
          </div>
          <div class="accordion-content__divider" />
        </div>
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
      } else {
        this.$store.commit('changeServiceOpenId', i)
      }
    },
    openHighlighted: function(i) {
      this.$store.commit('changeServiceOpenId', i)
    },
    handleClick: function(categoryId) {
      return function(e) {
        this.$router.push({ name: 'subcategories', params: { categoryId } })
      }
    },
    isLargeOpen: function(i) {
      return (
        this.$store.getters.serviceOpenId == i ||
        (i == 0 && this.$store.getters.serviceOpenId == -1)
      )
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

  @media @medium-and-up {
    display: flex;
    justify-content: center;
    position: relative;
  }
}

.accordion-item {
  @media @medium-and-up {
    margin-right: 20px;
  }
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

  @media @medium-and-up {
    display: none;
  }
}

.accordion-item__summary--large {
  display: flex;
  align-items: center;
  padding: 20px 0;

  @media @small {
    display: none;
  }
}

.accordion-item__bullet {
  margin-right: 5px;
  height: 20px;
  width: 25px;

  @media @medium-and-up {
    margin-right: 0;
  }
}

.accordion-item__title {
  font-family: 'Moret', serif;
  font-size: 30px;
  letter-spacing: 0.8px;
  padding: 0 10px;

  @media @medium-and-up {
    font-size: 18px;
    padding: 0 5px;
  }

  @media @large-and-up {
    font-size: 22px;
    padding: 0 5px;
  }
}

.accordion-item__title--open {
  @media @medium-and-up {
    color: @orange;
  }
}

.accordion-content {
  display: none;
}

.accordion-content--open-large {
  @media @medium-and-up {
    position: absolute;
    display: flex;
    left: 0;
    top: 100px;
  }
}

.accordion-content--open {
  @media @small {
    display: block;
    margin-top: 40px;
  }
}

.accordion-content__image-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  @media @medium-and-up {
    align-items: flex-start;
    flex: 1;
    margin-right: 30px;
  }
}

.accordion-content__image {
  width: 70%;

  @media @medium-and-up {
    width: 100%;
    margin: 0;
  }
}

.accordion-content__featured {
  color: @orange;
  font-family: 'TTCommons', sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
}

.accordion-content__container {
  display: flex;
  flex-direction: column;

  @media @medium-and-up {
    flex: 1;
  }
}

.accordion-content__description {
  font-family: 'TTCommons', sans-serif;
  font-size: 18px;
  padding: 10px 0;
  white-space: pre-wrap;

  @media @medium-and-up {
    padding: 0 0 15px;
  }
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
  font-family: 'TTCommons', sans-serif;
  font-size: 18px;
  padding: 5px 0;
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

  @media @medium-and-up {
    align-self: inherit;
  }
}

.accordion-content__divider {
  border-top: 1px solid @darkBlue;
  width: 100%;
  margin: 20px 0;

  @media @medium-and-up {
    display: none;
  }
}
</style>

<style lang="less">
@import '../../../common/utils.less';
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

  .sqs-block-button.inverted .sqs-block-button-element {
    margin: 0;
  }

  @media @medium-and-up {
    width: 350px;
  }
}

.accordion-content__arrow {
  display: inline;
  font-size: 28px;
  padding-left: 10px;
}
</style>
