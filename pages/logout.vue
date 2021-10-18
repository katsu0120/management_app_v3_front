<script>
export default {
  //  middlewareはページをレンダリングする前に実行されるメソッドなのでtemplateが不要
  middleware ({ redirect }) {
    return redirect('/')
  }
}
</script>
