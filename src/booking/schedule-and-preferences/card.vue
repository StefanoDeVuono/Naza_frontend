<template>
  <!-- based on vue-credit-card-field https://github.com/actengage/vue-credit-card-field/blob/master/src/Components/InlineCreditCardField.vue -->

  <div class="credit-card-field-wrapper form-group marker-form-group" @click="onClick">

    <slot name="control marker-control">
      <!-- TODO: maybe class form-control below -->
      <div class="credit-card-field marker01" :class="[controlClasses, variantClass, classes]">
        <div class="credit-card-field-icon-wrapper marker02">
          <div class="credit-card-field-icon-card marker03">
            <div class="credit-card-field-icon-front marker04">
              <icon :icon="['fab', 'cc-jcb']" data-brand="jcb" class="credit-card-field-icon marker-icon" />
              <icon :icon="['fab', 'cc-visa']" data-brand="visa" class="credit-card-field-icon marker-icon" />
              <icon :icon="['fab', 'cc-amex']" data-brand="amex" class="credit-card-field-icon marker-icon" />
              <icon :icon="['fab', 'cc-discover']" data-brand="discover" class="credit-card-field-icon marker-icon" />
              <icon :icon="['fab', 'cc-mastercard']" data-brand="mastercard"
                class="credit-card-field-icon marker-icon" />
              <icon :icon="['fab', 'cc-diners-club']" data-brand="dinersclub"
                class="credit-card-field-icon marker-icon" />
              <icon :icon="['far', 'credit-card']" data-brand="unknown" class="credit-card-field-icon marker-icon"
                width="20" height="18" />
            </div>
            <div class="credit-card-field-icon-back marker05">
              <icon :icon="['fas', 'credit-card']" class="credit-card-field-icon" width="23.33" height="20" />
            </div>
          </div>
        </div>

        <div class="credit-card-field-fields">
          <input v-focus.transform v-validate:number="validateNumber" v-model="card.number" max="19" type="text"
            placeholder="Card number" class="credit-card-field-field credit-card-field-number"
            :class="[{ 'is-empty': !card.number, 'is-invalid': validated.number === false }]">

          <div class="credit-card-field-security-fields">
            <input v-focus v-validate:expiration="validateExpiration" v-model="card.expiration" type="text"
              placeholder="MM / YY" maxlength="7" class="credit-card-field-field credit-card-field-expiration"
              :class="[{ 'is-empty': !card.expiration, 'is-invalid': validated.expiration === false }]">
            <input v-focus="validateCvc" v-validate:cvc="validateCvc" v-model="card.cvc" type="text" placeholder="CVC"
              autocomplete="off" class="credit-card-field-field credit-card-field-cvc"
              :class="[{ 'is-empty': !card.cvc, 'is-invalid': validated.cvc === false }]">
            <input v-focus="validatePostalCode" v-validate:postalCode="validatePostalCode" v-model="card.postalCode"
              max="5" type="text" placeholder="Postcode" maxlength="5"
              class="credit-card-field-field credit-card-field-postal"
              :class="[{ 'is-empty': !card.postalCode, 'is-invalid': validated.postalCode === false }]">
          </div>

          <div class="credit-card-field-placeholder-mask">Number</div>
          <div class="credit-card-field-number-mask" v-html="card.number"></div>
        </div>
      </div>
    </slot>

    <slot />

    <!-- <slot name="help">
      <small v-if="helpText" ref="help">
        {{ helpText }}
      </small>

    </slot> -->

    <slot name="feedback">
      <form-feedback v-if="validFeedback" v-html="validFeedback" valid />
      <form-feedback v-if="invalidFeedback" v-html="invalidFeedback" invalid />
    </slot>

  </div>

</template>

<script>
import './icons';
import Payment from 'payment';
import Variant from 'vue-interface/src/Mixins/Variant';
import FormControl from 'vue-interface/src/Mixins/FormControl';
import MergeClasses from 'vue-interface/src/Mixins/MergeClasses';
import { FontAwesomeIcon as Icon } from '@fortawesome/vue-fontawesome';


export default {

  name: 'credit-card-field',


  mixins: [
    MergeClasses,
    Variant,
    FormControl,

  ],

  components: {
    Icon
  },

  props: {

    activity: {
      type: Boolean,
      default: false
    },

  },

  watch: {
    'card.number': function (newVal, oldVal) {
      this.brand = this.card.brand = Payment.fns.cardType(newVal) || 'unknown';
      this.validated.number = null;

      if (this.$el.querySelector('.credit-card-field-lg')) {
        this.showSecurityFields = this.card.number.length >= 14;
      }
    },
    'card.expiration': function (newVal, oldVal) {
      this.validated.expiration = null;
    },
    'card.cvc': function (newVal, oldVal) {
      this.validated.cvc = null;
    },
    'card.postalCode': function (newVal, oldVal) {
      this.validated.postalCode = null;
    }
  },

  directives: {
    focus: {
      bind(el, binding, vnode) {
        el.addEventListener('focus', event => {
          el.style.transform = '';
          el.classList.add('is-focused');
          vnode.context.isFocused = true;
          vnode.context.focusedElement = event.target;
        });

        el.addEventListener('blur', event => {
          el.classList.remove('is-focused');
          vnode.context.isFocused = false;

          if (binding.modifiers.transform && vnode.context.shouldTransform(el)) {
            vnode.context.addTransform(el);
          }
        });
      }
    },
    validate: {
      bind(el, binding, vnode) {
        function validate(isValid) {
          vnode.context.validated[binding.arg] = el.value === '' ? false : binding.value && binding.value(el.value);
          vnode.context.$emit(isValid ? 'valid' : 'invalid', vnode.context.getEventPayload(el, isValid));

          if (vnode.context.isComplete() &&
            vnode.context.isValid() &&
            vnode.context.hasChanged()) {
            vnode.context.$emit('complete', vnode.context.getEventPayload(el, isValid));
          }
        }

        function maxLength(isValid) {
          return el.getAttribute('max') && el.value.length >= parseInt(el.getAttribute('max'));
        }

        el.addEventListener('keydown', event => {
          const isValid = binding.value && binding.value(el.value);

          if ((isValid || maxLength()) && vnode.context.isPrintableKeyCode(event)) {
            event.preventDefault();
          }
          else if (!el.value && event.keyCode === 8) {
            vnode.context.focusPrevElement(el);
          }

          vnode.context.previousValue = JSON.stringify(vnode.context.card);
        });

        el.addEventListener('keyup', event => {
          if (vnode.context.isPrintableKeyCode(event)) {
            const isValid = binding.value && binding.value(el.value);

            if (maxLength()) {
              validate(isValid);
            }

            if (isValid) {
              vnode.context.focusNextElement(el);
            }

            vnode.context.$emit('input', vnode.context.card);

            if (vnode.context.hasChanged()) {
              vnode.context.$emit('change', vnode.context.getEventPayload(el, isValid));
            }
          }
        });

        el.addEventListener('blur', event => {
          el.value !== '' && validate(binding.value && binding.value(el.value));
        });
      }
    }
  },

  computed: {

    classes() {
      const classes = {
        'show-security-fields': this.showSecurityFields,
        'credit-card-field-sm': this.width < 300 && this.width > 0,
        'credit-card-field-lg': this.width > 400,
        'has-activity': this.activity,
        'is-focused': this.isFocused,
        'is-invalid': this.isInvalid()
      };

      classes[`brand-${this.brand || 'unknown'}`] = true;

      if (this.isFocused) {
        classes[`is-focused-${this.getClassName(this.focusedElement)}`] = true;
      }
      else if (this.focusedElement) {
        classes[`last-focused-${this.getClassName(this.focusedElement)}`] = true;
      }

      for (let i in this.validated) {
        classes[`is-invalid-${i}`] = this.validated[i] === false;
      }

      return classes;
    }
  },

  methods: {

    addTransform(el) {
      const positionInfo = this.$el.querySelector('.credit-card-field-number-mask').getBoundingClientRect();
      const parts = el.value.split(' ');
      const totalWidth = positionInfo.width;
      const width = this.getTextWidth(parts[parts.length - 1].trim(), el);
      el.style.transform = 'translateX(' + ((totalWidth - width) * -1) + 'px)';
    },

    shouldTransform(el, offset = 1.25) {
      const totalWidth = el.offsetWidth - this.$el.querySelector('.credit-card-field-security-fields').offsetWidth;
      return totalWidth <= this.getTextWidth(el.value, el) * offset;
    },

    getDefaultCard() {
      return {
        number: this.$attrs.number || '',
        expiration: this.$attrs.expiration || '',
        cvc: this.$attrs.cvc || '',
        postalCode: this.$attrs.postalCode || ''
      };
    },

    getCardField() {
      return this.$el.querySelector('.credit-card-field');
    },

    getEventPayload(el, isValid) {
      const card = JSON.parse(JSON.stringify(this.card));
      const expiration = card.expiration.split('/');

      card.numberFormatted = card.number;
      card.number = card.number.replace(/\s/g, '');
      card.expMonth = expiration[0] ? expiration[0].trim() : null;
      card.expYear = expiration[1] ? expiration[1].trim() : null;

      return {
        card: card,
        brand: this.brand,
        invalid: this.isInvalid(),
        complete: this.isComplete(),
        input: {
          el: el,
          valid: isValid
        }
      };
    },

    getTextWidth(text, el) {
      const defaultView = (el.ownerDocument || document).defaultView;
      const computedStyle = defaultView.getComputedStyle(el);
      // re-use canvas object for better performance
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.margin = 0;
      context.font = computedStyle.font;
      var metrics = context.measureText(text);
      return metrics.width;
    },

    getClassName(el) {
      const classes = el.classList.item(1).split('-');
      return classes[classes.length - 1];
    },

    focusNextElement(el) {
      if (el.nextElementSibling && el.nextElementSibling.children[0]) {
        el.nextElementSibling.children[0].focus();
      }
      else if (el.nextElementSibling) {
        el.nextElementSibling.focus();
      }
    },

    focusPrevElement(el) {
      if (!el.value && el.previousElementSibling) {
        el.previousElementSibling.focus();
      }
      else if (!el.value) {
        this.$el.querySelector('.credit-card-field-number').focus();
      }
    },

    hasChanged() {
      return this.previousValue !== JSON.stringify(this.card);
    },

    validateCvc(value) {
      return Payment.fns.validateCardCVC(value);
    },

    validateNumber(value) {
      return Payment.fns.validateCardNumber(value);
    },

    validateExpiration(value) {
      return Payment.fns.validateCardExpiry(value);
    },

    validatePostalCode(value) {
      return value.match(/^\d{5}(?:[-\s]\d{4})?$/) !== null;
    },

    isPrintableKeyCode(event) {
      const keycode = event.keyCode;

      return (
        (keycode > 47 && keycode < 58) || // number keys
        keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223) // [\]' (in order)
      );
    },

    isValid() {
      for (let i in this.validated) {
        if (this.validated[i] !== true) {
          return false;
        }
      }

      return true;
    },

    isInvalid() {
      for (let i in this.validated) {
        if (this.validated[i] === false) {
          return true;
        }
      }

      return false;
    },

    isComplete() {
      return !!((
        this.validated.number &&
        this.validated.expiration &&
        this.validated.cvc &&
        this.validated.postalCode
      ));
    },

    onResize(event) {
      this.width = this.$el.offsetWidth;
      return this.onResize;
    },

    onClick(event) {
      if (!event.target.classList.contains('credit-card-field-field')) {
        this.focusedElement ? this.focusedElement.focus() : this.$el.querySelector('.credit-card-field-field').focus();
      }
    }

  },

  created() {
    this.card = this.getDefaultCard();
  },

  mounted() {
    Payment.formatCardCVC(this.$el.querySelector('.credit-card-field-cvc'));
    Payment.restrictNumeric(this.$el.querySelector('.credit-card-field-postal'));
    Payment.formatCardNumber(this.$el.querySelector('.credit-card-field-number'));
    Payment.formatCardExpiry(this.$el.querySelector('.credit-card-field-expiration'));

    this.$emit('input', this.card);

    window.addEventListener('resize', this.onResize());
  },

  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },

  data() {
    return {
      width: null,
      isFocused: false,
      focusedElement: null,
      previousValue: null,
      showSecurityFields: false,
      brand: null,
      validated: {
        number: null,
        expiration: null,
        cvc: null,
        postalCode: null
      },
      card: {
        brand: null,
        number: null,
        expiration: null,
        cvc: null,
        postalCode: null
      }
    };
  }

};

</script>

<style lang="less" scoped>
@form-feedback-invalid-colour: #dc3545;
@grey: #adb5bd;
@light-grey: #ced4da;
@form-feedback-valid-colour: #28a745;
// Width variables (appears count calculates by raw css)
@width1: calc(100% - .5em);
@width6: 2.5em;
// Height variables (appears count calculates by raw css)
@height2: calc((0.375rem * 2) + (1rem * 1.5) + (1px * 2));
@height3: 100%;
@input-focus-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
@input-focus-border-colour: #80bdff;

.StripeElement {
  box-sizing: border-box;
  height: 50px;
  padding: 14px 12px;
  margin: 6px 0;
  border: 2px solid #1c3042;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.credit-card-field-wrapper {
  position: relative;
  color: #1c3042; // reset
  font-family: "Helvetica Neue", Helvetica, sans-serif; // reset
  font-size: 16px; // reset

  .credit-card-field-activity {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    transition: opacity 0.15s ease-in-out;
    width: 3em;
  }

  .form-control.credit-card-field {
    background: white;
    box-sizing: border-box;
    // min-height: calc((0.375rem * 2) + (1rem * 1.5) + (1px * 2));
    overflow: hidden;
    position: relative;
    transition: width 0.333s ease-in-out;

    &.has-activity {
      width: calc(100% - 3em);

      &+.credit-card-field-activity {
        opacity: 1;
      }
    }

    &.form-control-sm {
      min-height: calc((0.25rem * 2) + (0.875rem * 1.5) + (1px * 2));
    }

    &,
    &.form-control-md {
      min-height: calc((0.375rem * 2) + (1rem * 1.5) + (1px * 2));
    }

    &.form-control-lg {
      min-height: calc((0.5rem * 2) + (1.25rem * 1.5) + (1px * 2));
    }

    &::-webkit-input-placeholder {
      color: @grey;
    }

    &::-moz-placeholder {
      color: @grey;
    }

    &:-ms-input-placeholder {
      color: @grey;
    }

    &:-moz-placeholder {
      color: @light-grey;
    }

    &+.invalid-feedback {
      display: block;
    }

    &.credit-card-field-sm {
      font-size: 0.95em;

      .credit-card-field-icon-wrapper {
        width: 0.5em;
      }

      .credit-card-field-fields,
      .credit-card-field-number {
        width: calc(100% - .5em);
      }

      .credit-card-field-icon-card {
        display: none;
      }

      .credit-card-field-fields {
        left: 0.5em;
      }
    }

    &.credit-card-field-lg {
      &.is-focused-number:not(.show-security-fields) .credit-card-field-security-fields {
        transform: translateX(-7.5em);
      }
    }

    .credit-card-field-fields {
      position: absolute;
      top: 50%;
      width: calc(100% - @width6);
      transform: translateY(-50%);
      left: 2.5em;
    }

    .credit-card-field-field,
    input.credit-card-field-field {
      float: left;
      display: inline;
      border: none;
      outline: 0;
      background: none;
      box-shadow: none;
      line-height: 1em;
      padding: .5em 0;
      transition: transform .333s ease-in-out;

      &.is-invalid {
        color: @form-feedback-invalid-colour;
      }
    }

    .credit-card-field-security-fields {
      position: absolute;
      left: 100%;
      // width: 11em;
      width: 14em;
      display: inline-block;
      transition: transform 0.333s ease-in-out;
    }

    .credit-card-field-placeholder-mask,
    .credit-card-field-number-mask {
      width: auto;
      opacity: 0;
      position: absolute;
      z-index: -1;
      color: @grey;
      top: 50%;
      line-height: 1em;
      font-size: 1em;
      white-space: nowrap;
      transform: translateY(-50%);
    }

    .credit-card-field-placeholder-mask {
      padding: 2px 0;
      transition: opacity ease 0.25s;
    }

    .credit-card-field-number {
      width: 100%;
    }

    .credit-card-field-expiration {
      width: 4.75em;
    }

    .credit-card-field-cvc {
      width: 2.75em;
    }

    .credit-card-field-postal {
      // width: 3.5em;
      width: 4.25em;
    }

    .credit-card-field-icon-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 2.5em;
      height: 100%;
      z-index: 2;
      background: white;
    }

    //TODO: Make the credit card field work based on commented out info rather than top depending on containter height
    .credit-card-field-icon-card {
      position: absolute;
      left: 0;
      // top: 50%;
      width: 2.5em;
      top: .5em;
      height: 50%;
      // transform: translateY(-50%);
      transition: transform 0.4s ease-in-out;
      transform-style: preserve-3d;

      .credit-card-field-icon {
        height: 100%;
        width: 2.5em;
        transition: .33s;
        padding: 0 .5em;
        position: absolute;
        top: 0;
        left: 0;
      }

      .credit-card-field-icon-back,
      .credit-card-field-icon-front .credit-card-field-icon {
        opacity: 0;
        transform: scale(0);
      }

      /* hide back of pane during swap */
      .credit-card-field-icon-front,
      .credit-card-field-icon-back {
        backface-visibility: hidden;
        position: absolute;
        height: 100%;
        width: 2.5em;
        top: 0;
        left: 0;
      }

      .credit-card-field-icon-front {
        z-index: 3;
        transform: rotateY(0deg);
      }

      .credit-card-field-icon-back {
        transform: rotateY(180deg);
      }
    }

    &:not(.is-focused) .credit-card-field-security-fields,
    &.is-focused-number .credit-card-field-security-fields {
      transform: translateX(-4.5em);
    }

    &.show-security-fields .credit-card-field-security-fields,
    &.is-focused-expiration .credit-card-field-security-fields,
    &.is-focused-cvc .credit-card-field-security-fields,
    &.is-focused-postal .credit-card-field-security-fields,
    &.last-focused-expiration .credit-card-field-security-fields,
    &.last-focused-cvc .credit-card-field-security-fields,
    &.last-focused-postal .credit-card-field-security-fields {
      transform: translateX(-100%);
    }

    &.is-focused {
      outline: none;
      border-color: @input-focus-border-colour;
      box-shadow: @input-focus-box-shadow;
    }

    &.is-focused:not(.is-focused-number),
    &:not(.is-focused).last-focused-expiration,
    &:not(.is-focused).last-focused-cvc,
    &:not(.is-focused).last-focused-postal {
      .credit-card-field-number.is-empty {
        opacity: 0;
      }

      .credit-card-field-number.is-empty~.credit-card-field-placeholder-mask {
        opacity: 1;
      }
    }

    &.is-focused-cvc {
      .credit-card-field-icon-card {
        perspective: 1000px;
        transform: rotateY(180deg);
      }

      .credit-card-field-icon-back {
        display: block;
        opacity: 1;
      }

      .credit-card-field-icon-front {
        display: none;
        opacity: 0;
      }
    }

    &.brand-jcb .credit-card-field-icon-card svg[data-brand="jcb"],
    &.brand-visa .credit-card-field-icon-card svg[data-brand=visa],
    &.brand-amex .credit-card-field-icon-card svg[data-brand="amex"],
    &.brand-unknown .credit-card-field-icon-card svg[data-brand="unknown"],
    &.brand-discover .credit-card-field-icon-card svg[data-brand="discover"],
    &.brand-mastercard .credit-card-field-icon-card svg[data-brand="mastercard"],
    &.brand-dinersclub .credit-card-field-icon-card svg[data-brand="dinersclub"] {
      opacity: 1;
      transform: scale(1);
    }

    &.is-invalid,
    &:invalid {
      outline: none;
      border-color: @form-feedback-invalid-colour;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .25);

      .credit-card-field-icon {
        color: @form-feedback-invalid-colour;
      }
    }

    &.is-valid,
    &:valid {
      outline: none;
      border-color: @form-feedback-valid-colour;
      box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, .25);

      .credit-card-field-icon {
        color: @form-feedback-valid-colour;
      }
    }
  }
}

.form-group {
  margin-bottom: 1rem;
  border: 2px solid #1c3042;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid @light-grey;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

svg:not(:root).svg-inline--fa {
  overflow: visible;
}

.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}

svg {
  overflow: hidden;
  vertical-align: middle;
}
</style>
