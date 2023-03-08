class O_prompt_settings{
    constructor(
        f_s__callback = (o) => `${JSON.stringify(o)}`, 
        f_a_o_filtered = function(
            prompt_result, 
            a_o, 
            o_prompt_settings
        ){

            var a_s = prompt_result.split(",");
            a_s = a_s.join(' ').split(' '), 
            a_s = a_s.filter(s=>s.trim() != '');
        
            var a_o_filtered = a_o.filter(
                function(o){
                    return a_s.includes(o.s_name)
                }
            )
            if(o_prompt_settings.b_option_select_all && a_s.includes(o_prompt_settings.s_option_select_all)){
                a_o_filtered = a_o
            }

            return a_o_filtered

        },
        s_join_string = ',',
        s_option_select_all = 'all', 
        b_option_select_all = true,
        b_require_valid_option = true,
        s_select_option_message_prefix = 'options are: ', 
        s_select_option_message_suffix = 'select an option: ', 
        f_s_not_valid_option_message = (v) => `${v}: is not a valid option`
    ){
        this.f_s__callback = f_s__callback
        this.f_a_o_filtered = f_a_o_filtered 
        this.s_join_string = s_join_string
        this.s_option_select_all = s_option_select_all
        this.b_option_select_all = b_option_select_all
        this.b_require_valid_option = b_require_valid_option
        this.s_select_option_message_prefix = s_select_option_message_prefix 
        this.s_select_option_message_suffix = s_select_option_message_suffix 
        this.f_s_not_valid_option_message = f_s_not_valid_option_message 
    }
}

let f_f_a_o_filtered__property_content_must_match = function(a_s_prop_name){
    if(typeof a_s_prop_name == 'string'){
        a_s_prop_name = [a_s_prop_name]
    }
    return function(
        prompt_result, 
        a_o, 
        o_prompt_settings
    ){

        var a_s = prompt_result.split(",");
        a_s = a_s.join(' ').split(' '), 
        a_s = a_s.filter(s=>s.trim() != '');
    
        var a_o_filtered = a_o.filter(
            function(o){
                // var b = false; 
                for(var s_prop_name of a_s_prop_name){
                    if(a_s.includes(o[s_prop_name].toString().trim())){
                        return true
                    }
                }
            }
        )
        if(o_prompt_settings.b_option_select_all && a_s.includes(o_prompt_settings.s_option_select_all)){
            a_o_filtered = a_o
        }

        return a_o_filtered

    }
}

let f_a_o__prompt_from_a_o = function(
    a_o, 
    o_prompt_settings = false, 
    o__default
){  
    if(!o_prompt_settings){
        o_prompt_settings = f_o_prompt_settings__s_prop_name('n_id');
    }

    var a_s_option = a_o.map(o_prompt_settings.f_s__callback) //o_prompt_settings.f_s__callback(o));
    if(o_prompt_settings.b_option_select_all){
        a_s_option.push(o_prompt_settings.s_option_select_all)
    }
    console.log(o_prompt_settings.s_select_option_message_prefix)
    var prompt_result = prompt(
`[
${a_s_option.join(o_prompt_settings.s_join_string)}
]
${o_prompt_settings.s_select_option_message_suffix}`
    );
    if(
        prompt_result == null
        && 
        o__default
        ){
        a_o_filtered = [o__default]
    }else{
        if(prompt_result == null){
            a_o_filtered = []
        }else{

            var a_o_filtered = o_prompt_settings.f_a_o_filtered(
                prompt_result,
                a_o,
                o_prompt_settings
                );
        }
    }

    if(o_prompt_settings.b_require_valid_option){
        if(a_o_filtered.length == 0){
            console.log(o_prompt_settings.f_s_not_valid_option_message(prompt_result)), 
            a_o_filtered = f_a_o__prompt_from_a_o(
                a_o, 
                o_prompt_settings
            );
        }
    }
    return a_o_filtered

}


// class O_option{
//     constructor(
//         n_id, 
//         s_name,
//         b_default
//     ){
//         this.n_id = n_id, 
//         this.s_name = s_name
//         this.b_default = b_default
//     }
// }


export {
    f_a_o__prompt_from_a_o, 
    O_prompt_settings, 
    f_f_a_o_filtered__property_content_must_match
    // f_o_option__prompt, 
    // O_option
}


