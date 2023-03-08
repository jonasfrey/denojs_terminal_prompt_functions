//./readme.md:start
//md: # prompt helper functions
//md: ## import ...
import {
    f_a_o__prompt_from_a_o,
    O_prompt_settings, 
    f_f_a_o_filtered__property_content_must_match
} from "./mod.module.js"
//md: ## let the user pick an object from an array
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
//md: ## example 1)
//md: pick an object by entering a string wich matches 's_name'
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

//md: ## example 2)
//md: pick an object by entering a (number) string wich matches 'n_id'
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

//md: ## example 3)
//md: pick an object by entering a string (number or string) wich matches 'n_id' or 's_name'

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

//./readme.md:end

