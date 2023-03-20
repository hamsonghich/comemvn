<template>
  <div class="container-fluid">
    <div class="row collections-sidebar">
      <div class="collections-sidebar__widget">
        <div class="collections-sidebar__heading text--18 font--semibold mb--6 pb--0">
          Danh mục sản phẩm
        </div>
      </div>

      <div class="wrapper-collapse">
        <div v-for="(item, index) in dataAllProduct" :key="index">
          <b-button class="button-collapse d-flex justify-content-between align-items-center"
                    v-b-toggle="'collapse-' + index">
            <div class="when-opened w-100">
              <div class="d-flex justify-content-between align-items-center">
                <nuxt-link :to="/product/+ item?.link">
                <span>
                    {{ item?.name }} <span class="count">{{ item.list.length }}</span>
                </span>
                </nuxt-link>
                <i class="fa-solid fa-angle-down"></i>
              </div>

            </div>
            <div class="when-closed  w-100">
              <div class="d-flex justify-content-between align-items-center">
                <nuxt-link :to="/product/+ item?.link">
                <span>
                    {{ item?.name }} <span class="count">{{ item?.list?.length }}</span>
                </span>
                </nuxt-link>
                <i class="fa-solid fa-angle-up"></i>
              </div>

            </div>
          </b-button>
          <b-collapse class="wrapper-collapse-child" :id="`collapse-`+index">
            <b-card v-for="(itemC, indexC) in item?.list" :key="indexC">
              <i class="fa-thin fa-minus"></i>
              <nuxt-link :to="/product-sub/+ itemC.link">
                <span>
                    {{ itemC?.name }} <span class="count">{{ itemC?.products?.length  || 0}}</span>
                </span>
              </nuxt-link>
            </b-card>
          </b-collapse>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataAllProduct: []
  },
  data() {
    return {
      isIconArrow: [false]
    }
  },
  computed: {},
  methods: {
    toggleArrow(index) {
      console.log(index)
      this.isIconArrow[index] = !this.isIconArrow[index]
      console.log(this.isIconArrow[index])
    }
  }
}

</script>

<style scoped lang="scss">
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

.collections-sidebar__heading {
  color: var(--color-15);
  line-height: 28px;
  position: relative;
  text-transform: uppercase;
}

.collections-sidebar__heading:after {
  background-image: url("~assets/img/background/heading-line.svg");
  background-position: 0;
  background-repeat: no-repeat;
  background-size: contain;
  content: "";
  height: 6px;
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.57);
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.28);
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.41);
}

.wrapper-collapse {
  max-height: 500px;
  overflow-y: scroll;
  width: 100%;

  .not-collapsed {
    font-weight: 600;

    span {
      font-size: 1.05rem;

      .count {
        font-size: 0.8rem;
      }
    }

    i {
      font-size: 1.05rem;
    }
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .count {
    color: var(--color-2);
    padding-bottom: 5px;
    font-size: 0.65rem;
  }

  ::v-deep .button-collapse {
    width: 100% !important;
    cursor: pointer;
    padding: 10px;
    background: none;
    border: none;
    color: var(--color-primary);
    border-top: 1px solid #f1f1f1;
  }

  ::v-deep .button-collapse:focus-visible, ::v-deep .button-collapse:focus {
    background: none;
    border: none;
    box-shadow: none !important;
  }

  .wrapper-collapse-child {
    .card {
      border: none;
      border-radius: 0;

      .card-body {
        padding: 0.5rem;
        border-top: 1px solid #f1f1f1;
        .count {
          font-size: 0.8rem;
          color: var(--color-2);
        }
      }
    }
  }
}
</style>

