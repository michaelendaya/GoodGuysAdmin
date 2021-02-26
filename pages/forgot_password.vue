<template>
      <div class="about-box-main">
            <div class="container">
                  <div class="row">
                        <div class="col-lg-2 "></div>
                        <div class="col-lg-8 col-sm-12">
                              <div class="contact-form-right">
                                    <h2>
                                          Enter your Email Address associated
                                          with your Account
                                    </h2>
                                    <h3 style="color: #FF0000; ">
                                          {{ status }}
                                    </h3>

                                    <form action="">
                                          <div class="row">
                                                <!-- Email -->
                                                <div class="col-md-12">
                                                      <div
                                                            clas="form-group why-text"
                                                      >
                                                            <br />
                                                            <h4>Email</h4>

                                                            <input
                                                                  class="form-control"
                                                                  v-model="
                                                                        email
                                                                  "
                                                            />
                                                      </div>
                                                </div>
                                                <!-- Password -->
                                                <div class="col-md-12">
                                                      <br />
                                                      <div
                                                            class="submit-button text-center"
                                                      >
                                                            <a
                                                                  type="button"
                                                                  class="btn hvr-hover"
                                                                  href="#"
                                                                  @click="
                                                                        onLogin
                                                                  "
                                                                  >Send Email</a
                                                            >
                                                            <div
                                                                  class="h3 text-center hidden"
                                                            ></div>
                                                            <div
                                                                  class="clearfix"
                                                            ></div>
                                                      </div>
                                                      <div></div>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script>
export default {
      middleware: 'auth',
      auth: 'guest',

      data() {
            return {
                  email: '',
                  status: '',
            };
      },
      methods: {
            async onLogin() {
                  try {
                        let data = { email: this.email };
                        let response = await this.$axios.$put(
                              '/api/auth/forgot_password',
                              data
                        );
                        if (response.status == 'success') {
                              this.$router.push('/');
                              console.log('Email has been sent');
                        } else {
                              this.status = 'Can not find user with this email';
                        }
                        console.log(response);
                  } catch (error) {
                        console.log(error);
                        console.log('Email does not exist');
                  }
            },
      },
};
</script>
