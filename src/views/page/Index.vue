<template>
    <div class="page-sum">
        <component :is="tag" >标题1</component>
        <card />
        <charts />
    </div>
</template>

<script>
import Card from '../../components/Card'
import Charts from '../../components/Charts.vue'
export default {
    components:{ 
        Card,
        Charts
    },
    data(){
        return {
            tag:'div'
        }
    }
}
</script>

<style>

</style>