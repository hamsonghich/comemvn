<template>
  <div>
    <nuxt-link class="text-deco-none" :to="/product-details/+ infoProduct.link">
      <b-card
        title=""
        :img-src="infoProduct.images[0].link"
        :img-alt="infoProduct.images[0].name"
        img-top
        style="max-width: 15rem;"
        class="tag-img px--3 py--2"
      >
        <div class="price-discount">
          - {{infoProduct?.discount}}%
        </div>
        <div class="tag-description">
          {{infoProduct['tag-description']}}
        </div>
        <div class="tag-description">
          {{infoProduct['tag-description']}}
        </div>
        <div class="tag-name font--medium text--14 mt--5">
          {{infoProduct.name}}
        </div>
        <div class="wrapper-price d-flex justify-content-between align-items-center mt--2">
          <span class="new-price font--semibold text--18">{{infoProduct['price-old']}} <sup class="font--semibold">đ</sup></span>
          <span class="old-price font--semibold text-12">{{infoProduct['price-old']}} <sup class="font--semibold">đ</sup></span>
        </div>
        <div style="pointer-events: none" class="mt--1">
          <b-form-rating v-model="value" color="var(--color-2)" class="rating mt--0"></b-form-rating>
        </div>

        <div class="rate font--regular text--12 mt--1 mb--3">
          {{ this.infoProduct.star}}/{{infoProduct.rate}} đánh giá
        </div>
      </b-card>
    </nuxt-link>

  </div>
</template>

<script>
import {info} from "sass";

export default {
  methods: {
    info() {
      return info
    }
  },
  props: {
    infoProduct: {}
  },
  data() {
    return {
      value: this.infoProduct.star
    }
  },

}

</script>
<style scoped lang="scss">
a {
  text-decoration: none;
}

.card {
  border: none;
  box-shadow: 1px 1px 10px rgba(115, 129, 54, .2);
}

.price-discount {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-2);
  width: 56px;
  padding: 3px 15px;
  color: var(--color-white);
  font-size: 0.7rem;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: 600;
}

.tag-description {
  position: absolute;
  top: 30px;
  left: 0;
  background: var(--color-primary);
  padding: 3px 15px;
  color: var(--color-white);
  font-size: 0.7rem;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: 600;
}

.tag-img {
  width: 100%;
  height: 100%;
}

.card-body {
  padding: 0;
}

.tag-name {
  color: var(--color-black);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-name:hover {
  color: var(--color-primary);
}

.wrapper-price {
  .new-price {
    color: var(--color-16);
  }

  .old-price {
    color: var(--color-17);
    text-decoration: line-through;
  }
}

.rating {
  padding: 0;
  border: none;
  width: 100px;
  height: 20px;
  margin: 0 0 0 -4px;
}

.rate {
  color: var(--color-17);
}
</style>
