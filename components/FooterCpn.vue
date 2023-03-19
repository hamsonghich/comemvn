<template>
  <div class="container-fluid p--0 m--0">
    <div class="row p--0 m--0">
      <div class="wrapper-footer d-flex justify-content-between align-items-center px--10">
        <div class="content d-flex  flex-column justify-content-start align-items-center">
          <div class="w-100">
            <ul class="d-flex justify-content-start align-items-center">
              <li>
                <nuxt-link to="/home">Trang chủ Prudential</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/home">Bản quyền</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/home">Bảo mật</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/home">Liên hệ</nuxt-link>
              </li>
            </ul>
          </div>
          <div>
            <span class="content-text">Bản quyền thuộc về Công ty TNHH BHNT Prudential Việt Nam. Tất cả các quyền được bảo hộ.</span>
          </div>
        </div>
        <div class="icons d-flex justify-content-between align-items-center">
          <font-awesome-icon icon="fa-solid fa-cloud" />
          <font-awesome-icon icon="fa-solid fa-house" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .wrapper-footer{
    height: 96px;
    background-color: black;

    ul{
      margin-bottom: 10px;
      li{
        margin-right: 10px;
        a{
          text-decoration: none;
          color: white;
        }
      }
    }

    .content-text{
      color: white;
    }
    .icons{
      width: 100px;
      svg{
        color: white;
        padding: 10px 9px;
        border: 1px solid white;
        border-radius: 50%;
      }
    }

  }
</style>
