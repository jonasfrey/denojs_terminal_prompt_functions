<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Wed Nov 22 2023 12:37:10 GMT+0100 (Central European Standard Time)","n_ts_created":1700653030750} -->
# prompt helper functions
## import ...
```javascript
import {
    f_a_o__prompt_from_a_o,
    O_prompt_settings, 
    f_f_a_o_filtered__property_content_must_match,
    f_a_v__prompt
} from "./mod.module.js"
```
## let the user pick an object from an array
```javascript
class O_person{
    constructor(n_id, s_name){
        this.n_id = n_id
        this.s_name = s_name
    }
};
let o_person__hans = new O_person(1,"hans")
let o_person__berta = new O_person(2,"berta")
let o_person__gabriel = new O_person(3,"gabriel")
let o_person__judith = new O_person(9,"judith")
let a_o_person = [
    o_person__hans,
    o_person__berta,
    o_person__gabriel,
    o_person__judith,
];
// ## select an option, 
//  let f_a_v__prompt = function(
//      a_v,
//      f_s,
//      f_a_v, 
//      v_default, 
//      f_s_invalid_input = (s_prompt_input)=>''
//  ){ 
let a_o_person_selected = f_a_v__prompt(
    a_o_person,
    (a_v)=>{
        return a_v.map(
            (o,n_idx)=>{return `${n_idx}: ${o.s_name}`}
        ).join('\n')
    },
    (a_v, s_prompt_input)=>{
        if(s_prompt_input == 'all'){return a_v}
        return a_v.filter(
            (v, n_idx)=>{
                function isNumeric(value) {
                    return /^-?\d+$/.test(value);
                }
                if(isNumeric(s_prompt_input)){
                    return parseInt(s_prompt_input)== n_idx
                }
                return v.s_name.toLowerCase() == (s_prompt_input.toLowerCase())
            }
        )
    }, 
    o_person__berta,
    (s)=>`'${s}' invalid input`
);
console.log(`you have selected ${JSON.stringify(a_o_person_selected)}`)

```
## example 1)
pick an object by entering a string wich matches 's_name'
```javascript
var a_o_person__selected_by_user = f_a_o__prompt_from_a_o(
    a_o_person, 
    new O_prompt_settings(
        (o_person) => `${o_person.s_name}`,
        f_f_a_o_filtered__property_content_must_match('s_name')
    )
);
console.log(a_o_person__selected_by_user)
if(a_o_person__selected_by_user.includes(o_person__hans)){
    console.log("hurray hans was in your selection!")
}

```
## example 2)
pick an object by entering a (number) string wich matches 'n_id'
```javascript
var a_o_person__selected_by_user = f_a_o__prompt_from_a_o(
    a_o_person, 
    new O_prompt_settings(
        (o_person) => `${o_person.n_id}) ${o_person.s_name}`,
        f_f_a_o_filtered__property_content_must_match('n_id'), 
        ',\n'
    )
);
console.log(a_o_person__selected_by_user)
if(a_o_person__selected_by_user.includes(o_person__hans)){
    console.log("hurray hans was in your selection!")
}

```
## example 3)
pick an object by entering a string (number or string) wich matches 'n_id' or 's_name'
```javascript

var a_o_person__selected_by_user = f_a_o__prompt_from_a_o(
    a_o_person, 
    new O_prompt_settings(
        (o_person) => `${o_person.n_id}) ${o_person.s_name}`,
        f_f_a_o_filtered__property_content_must_match(['s_name', 'n_id']), 
        ',\n'
    )
);
console.log(a_o_person__selected_by_user)
if(a_o_person__selected_by_user.includes(o_person__hans)){
    console.log("hurray hans was in your selection!")
}

```
## example 4)
pick an object by entering a string (number) 'n_id', with a default selection
```javascript

var a_o_person__selected_by_user = f_a_o__prompt_from_a_o(
    a_o_person, 
    new O_prompt_settings(
        (o_person) => `${o_person.n_id}) ${o_person.s_name} ${(o_person == o_person__gabriel) ?'(default)': ''}`,
        f_f_a_o_filtered__property_content_must_match(['s_name', 'n_id']), 
        ',\n'
    ), 
    o_person__gabriel
);
console.log(a_o_person__selected_by_user)
if(a_o_person__selected_by_user.includes(o_person__hans)){
    console.log("hurray hans was in your selection!")
}


```