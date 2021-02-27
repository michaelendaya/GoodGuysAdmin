<template>
  <div class="about-box-main">
    <div class="container">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8 col-sm-12">
          <div class="contact-form-right">
            <h2>Profile Page</h2>
            {{ success }}
          

            <div class="row">
              <!-- Username -->
              <div class="col-md-12">
                <div clas="form-group why-text">
                  <br />
                  <h4>Username</h4>
                  {{ $auth.$state.user.name }}
                </div>
              </div>
              <!-- Email -->
              <div class="col-md-12">
                <div clas="form-group why-text">
                  <br />
                  <h4>
                    Email
                    <a
                      class="link2 fa-pull-right"
                      href="#"
                      @click="updateEmail = !updateEmail"
                      >Update Email</a
                    >
                  </h4>
                  <div v-show="!updateEmail">
                    {{ $auth.$state.user.email }}
                  </div>

                  <div v-show="updateEmail">
                    <form @submit.prevent="onUpdateProfile">
                      <input
                        class="form-control"
                        v-model="email"
                        :placeholder="$auth.$state.user.email"
                      />

                      Password
                      <input
                        class="form-control"
                        type="password"
                        v-model="password"
                      />
                      <div style="color: red">{{ error }}</div>
                      <br />
                      <div class="submit-button text-center">
                        <button type="submit" class="btn hvr-hover" href="#">
                          Update Email
                        </button>

                        <div class="clearfix"></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- Password -->
              <div class="col-md-12">
                <div clas="form-group why-text">
                  <br />
                  <h4>
                    Password
                    <a
                      class="link2 fa-pull-right"
                      href="#"
                      @click="updatePassword = !updatePassword"
                      >Update Password</a
                    >
                  </h4>
                  <div v-show="updatePassword">
                    <form @submit.prevent="onUpdatePassword">
                      Old Password
                      <input
                        class="form-control"
                        type="password"
                        v-model="password"
                      />
                      <div style="color: red">{{ error }}</div>
                      New Password
                      <input
                        class="form-control"
                        type="password"
                        v-model="newPassword"
                      />
                      Confirm Password
                      <input
                        class="form-control"
                        type="password"
                        v-model="confirmPassword"
                        @blur="comparePassword()"
                      />
                      <div style="color: red">{{ passwordMismatch }}</div>
                      <br />
                      <div class="submit-button text-center">
                        <button
                          type="submit"
                          class="btn hvr-hover"
                          href="#"
                          @click="onUpdateProfile"
                          :disabled="isActive"
                        >
                          Update Password
                        </button>

                        <div class="clearfix"></div>
                      </div>
                    </form>
                  </div>

                  <!-- Submit -->
                </div>
                <br />
                <br />

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      newPassword: "",
      confirmPassword: "",
      passwordMismatch: "",
      updateUsername: false,
      updateEmail: false,
      updatePassword: false,
       isActive:true,
      error: "",
      success: "",
    };
  },
  methods: {
    comparePassword() {
      this.passwordMismatch = "";
      if (this.newPassword != this.confirmPassword) {
        this.passwordMismatch = "Password does not match";
             this.isActive= true

      }
      else{
        this.isActive= false
      }
    },
    async onUpdateProfile() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        newPassword: this.newPassword,
      };
      try {
        let response = await this.$axios.$put("api/auth/user", data);
        if (response.success) {
          this.email = "";
          this.password = "";
          this.updateEmail = false;
              this.error=""
          this.success = "Successfully updated the user";
          await this.$auth.fetchUser();
        }
        setTimeout(() => {
          this.success = "";
        }, 5000);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        this.error = error.response.data.message;
      }
    },

    async onUpdatePassword() {
      let data = {
        password: this.password,
        newPassword: this.newPassword,
      };
      try {
        let response = await this.$axios.$put("api/auth/user", data);
        if (response.success) {
          this.email = "";
          this.password = "";
          this.updateEmail = false;
          this.updatePassword = false;
              this.error=""
          this.success = "Successfully updated the user";
          await this.$auth.fetchUser();
        }
        setTimeout(() => {
          this.success = "";
        }, 5000);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        this.error = error.response.data.message;
      }
    },


  },
};
</script>
<style scoped>
.link2 {
  font-weight: 400;
  font-size: 100%;
  text-decoration: underline !important;
}

h4 .link2 {
  font-weight: 400;
  font-size: 90%;
  text-decoration: underline !important;
}
</style>