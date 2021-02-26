<template>
      <div class="about-box-main">
            <div class="container">
                  <div class="row">
                        <div class="col-lg-2 "></div>
                        <div class="col-lg-8 col-sm-12">
                              <div class="contact-form-right">
                                    <h2>Enter your new password</h2>

                                    <form action="">
                                          <div class="row">
                                                <!-- Email -->
                                                <div class="col-md-12">
                                                      <div
                                                            clas="form-group why-text"
                                                      >
                                                            <br />
                                                            <h4>NewPassword</h4>

                                                            <input
                                                                  class="form-control"
                                                                  v-model="
                                                                        newPassword
                                                                  "
                                                                  type="password"
                                                            />
                                                      </div>
                                                </div>
                                                <div class="col-md-12">
                                                      <div
                                                            clas="form-group why-text"
                                                      >
                                                            <br />
                                                            <h4>
                                                                  Confirm
                                                                  Password
                                                            </h4>

                                                            <input
                                                                  class="form-control"
                                                                  v-model="
                                                                        confirmPassword
                                                                  "
                                                                  type="password"
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
                                                                        onReset
                                                                  "
                                                                  >Reset
                                                                  Password</a
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
                  newPassword: '',
                  confirmPassword: '',
            };
      },
      methods: {
            async onReset() {
                  try {
                        if (this.newPassword == this.confirmPassword) {
                              let data = {
                                    resetLink: this.$route.params.resetLink,
                                    newPass: this.newPassword,
                              };
                              try {
                                    let response = await this.$axios.$put(
                                          `http://localhost:3000/api/auth/reset_password/${this.$route.params.resetLink}`,
                                          data
                                    );
                                    console.log('Password has been changed');
                                    this.$router.push('/');
                              } catch (error) {
                                    console.log(data);
                              }
                              l;
                        } else {
                              console.log('Password not matched...');
                              this.newPassword = '';
                              this.confirmPassword = '';
                        }
                  } catch (error) {
                        console.log(error);
                  }
            },
      },
};
</script>
