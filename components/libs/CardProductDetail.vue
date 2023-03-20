<template>
  <div class="wrapper-card">
    <nuxt-link class="text-deco-none" :to="/product-details/+ infoProduct.link">
      <b-card
        title=""
        :img-src="infoProduct.images[0].link"
        :img-alt="infoProduct.images[0].name"
        img-top
        class="tag-img px--3 py--2"
      >
        <div class="wrapper-tag">
          <div v-if="infoProduct['discount']" class="price-discount">
            - {{ infoProduct['discount'] }}%
          </div>
          <div v-if="infoProduct['tag-description']" class="d-flex flex-wrap">
            <div class="mt--2 w-100" v-for="item in infoProduct['tag-description'].split('||')">
              <span class="tag-description">
                 {{ item }}
              </span>

            </div>
          </div>
        </div>


        <div class="tag-name font--medium text--14 mt--5">
          {{ infoProduct.name }}
        </div>
        <div class="wrapper-price d-flex justify-content-between align-items-center mt--2">
          <span
            class="new-price font--semibold text--18">{{
              fnCalcDiscount(infoProduct['price-old'], infoProduct['discount'])
            }} <sup
              class="font--semibold">đ</sup></span>
          <span v-if="infoProduct['discount']"
            class="old-price font--semibold text-12">{{ fnConvertPrice(infoProduct['price-old']) }} <sup
            class="font--semibold">đ</sup></span>
        </div>
        <div style="pointer-events: none" class="mt--1">
          <b-form-rating v-model="value" color="var(--color-2)" class="rating mt--0"></b-form-rating>
        </div>

        <div class="rate font--regular text--12 mt--1 mb--3">
          {{ this.infoProduct.star }}/{{ infoProduct.rate }} đánh giá
        </div>
      </b-card>
    </nuxt-link>

  </div>
</template>

<script>

export default {
  props: {
    infoProduct: {}
  },
  data() {
    return {
      value: this.infoProduct.star
    }
  },
  methods: {
    fnCalcDiscount(oldPrice, discount) {
      if(discount){
        return Math.floor(oldPrice * (100 - discount) / 100000) + '.000';
      }else{
        return Math.floor(oldPrice / 1000) + '.000';
      }

    },
    fnConvertPrice(oldPrice) {
      return Math.floor(oldPrice / 1000) + '.000';
    }
  },
}

</script>
<style scoped lang="scss">
.wrapper-card:hover{
  transform: scale(1.03);
  transition: 0.35s ease-in-out;
  .wrapper-tag{
    .price-discount {
      opacity: 0.8;
    }
    .tag-description {
      opacity: 0.8;
    }
  }

}
.wrapper-card{
  transition: 0.35s ease-in-out;
}
a {
  text-decoration: none;
}
.card {
  border: none;
  box-shadow: 1px 1px 10px rgba(115, 129, 54, .2);
}

.wrapper-tag {
  position: absolute;
  top: 0;
  left: 0;

  .price-discount {
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
    background: var(--color-primary);
    padding: 3px 15px;
    color: var(--color-white);
    font-size: 0.7rem;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    font-weight: 600;
  }

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
