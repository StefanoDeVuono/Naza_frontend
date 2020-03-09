<template>
  <div class="contact-us">
    <div class="contact-us__info-container">
      <div class="contact-us__header landing-header">
        <div class="landing-header__text">Contact</div>
        <div class="landing-header__text--underline">us</div>
      </div>
      <div class="contact-us__methods">
        <div class="contact-us__method">
          <a href="tel:415-854-7111"
            ><PhoneIcon class="contact-us__social-icon" />(415) 854-7111</a
          >
        </div>
        <div class="contact-us__method">
          <a href="mailto:booking@nazabeauty.com">
            <EmailIcon
              class="contact-us__social-icon"
            />booking@nazabeauty.com</a
          >
        </div>
        <div class="contact-us__method">
          <a target="_blank" href="https://twitter.com/naza_beauty"
            ><TwitterIcon class="contact-us__social-icon" />@naza_beauty</a
          >
        </div>
        <div class="contact-us__method">
          <a target="_blank" href="https://www.instagram.com/nazabeautysf/"
            ><InstagramIcon class="contact-us__social-icon" />@nazabeautysf</a
          >
        </div>
        <div class="contact-us__method">
          <a target="_blank" href="https://goo.gl/maps/fgU4fpSN1pAjxuAt8"
            ><PinIcon class="contact-us__social-icon" />985 Valencia St, San
            Francisco, CA 94110</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InstagramIcon from 'images/instagram.svg'
import TwitterIcon from 'images/twitter.svg'
import PhoneIcon from 'images/phone.svg'
import PinIcon from 'images/pin.svg'
import EmailIcon from 'images/email.svg'

export default {
  components: {
    TwitterIcon,
    InstagramIcon,
    PhoneIcon,
    PinIcon,
    EmailIcon,
  },
}
</script>

<style lang="less" scoped>
@import '../../common/utils.less';
@import './landing.less';

.contact-us {
  font-family: 'TTCommons';
  color: @white;
  background-color: @darkBlue;
  padding: 40px;
  display: flex;
  justify-content: center;

  .contact-us__methods {
    padding-top: 20px;
  }

  .contact-us__method {
    padding: 1px;
    display: flex;
    font-size: 18px;

    a {
      padding: 6px;
    }
  }

  .contact-us__social-icon {
    height: 14px;
    margin-right: 5px;
    position: relative;
    top: 2px;
    width: 18px;
  }

  @media @small {
    padding-bottom: 140px;
  }
}
</style>
