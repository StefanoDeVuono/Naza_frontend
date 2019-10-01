<template>
  <div class="footer sqs-grid-12 columns-12">
    <div class="row sqs-row">
      <div class="col sqs-col-5 span-5">
        <h3>NAZA</h3>
        <ul>
          <li>
            <router-link
              @click.native="$event.stopImmediatePropagation()"
              :to="{ name: 'categories' }"
              >Book Appointment</router-link
            >
          </li>
          <li>Our Services</li>
          <li>
            <router-link
              @click.native="$event.stopImmediatePropagation()"
              :to="{ name: 'how-it-works' }"
              >How Naza Works</router-link
            >
          </li>
          <li>Our Stylists</li>
        </ul>
      </div>
      <div class="col sqs-col-4 span-4">
        <h3>EXPLORE</h3>
        <ul>
          <li>Gallery</li>
          <li>About us</li>
          <li>Blog</li>
        </ul>
      </div>
      <div class="col sqs-col-3 span-3">
        <h3>SUPPORT</h3>
        <ul>
          <li>FAQ</li>
          <li>Contact Us</li>
        </ul>

        <h3>JOIN US</h3>
        <ul>
          <li>Stylists</li>
        </ul>

        <h3 v-if="shared.userToken">ACCOUNT</h3>
        <ul v-if="shared.userToken">
          <li>
            <a @click.prevent.stop="logOut">Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from 'common/storage'

export default {
  data() {
    return {
      shared: Storage.sharedState,
    }
  },

  methods: {
    logOut() {
      this.$session.remove('userToken')
      this.shared.userToken = null
    },
  },
}
</script>

<style lang="less">
@import '../../styles/util.less';
@import '../common/utils.less';

@orange: #bc5940;

.footer {
  .ignore-parent-padding();
  padding: 60px;
  background-color: #e6e1da;

  h3 {
    color: @orange;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 0.25em;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
    font-size: 14px;
    line-height: 1.7em;
  }
}
</style>
