<script lang="ts">
import Input from '../../lib/components/input.svelte';
    import Button from '../../lib/components/button.svelte';


    let email="";
    let password ="";

</script>

<form method="post" class="space-y-5 {$$props.class}">
<Input label="Email" id="email" name="email" type="email bind:value={email} " required></Input>
<Input label='Password' id='password' name='password' type='password' bind:value={password} required />
<Button  type='submit'>Sign In</Button>
</form>