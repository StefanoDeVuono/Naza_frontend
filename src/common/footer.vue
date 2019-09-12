<template>
  <div class="footer sqs-grid-12 columns-12">
    <div class="row sqs-row">
      <div class="col sqs-col-5 span-5">
        <h2>Brand</h2>
        <ul>
          <li>Book Appointment</li>
          <li>Our Services</li>
          <li>Abous us</li>
          <li>Blog</li>
        </ul>
      </div>
      <div class="col sqs-col-4 span-4">
        <h2>Support</h2>
        <ul>
          <li>FAQ</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div class="col sqs-col-3 span-3">
        <h2>Stylist</h2>
        <ul>
          <li>Join us!</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import '../../styles/util.less';
@import '../common/utils.less';

@orange: #bc5940;

.footer {
  .ignore-parent-padding();
  .ignore-parent-padding--add-padding(2);

  background-color: #e6e1da;

  h2 {
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
