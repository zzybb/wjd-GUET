import Vue from 'vue'
import { Button,Cascader,Input,Form,FormItem,Radio,RadioGroup,Select,Option,InputNumber,CheckboxGroup,Checkbox,Upload,Dialog,Calendar,ButtonGroup,Carousel,CarouselItem,Pagination,Loading,Tabs,TabPane,Steps,Step,DatePicker} from 'element-ui'
var component = [Button,Cascader,Input,Form,FormItem,Radio,RadioGroup,Select,Option,InputNumber,CheckboxGroup,Checkbox,Upload,Dialog,Calendar,ButtonGroup,Carousel,CarouselItem,Pagination,Loading,Tabs,TabPane,Steps,Step,DatePicker];

for(var item in component){
    Vue.use(component[item]);
}

