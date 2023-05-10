export function validate (inputs) {
    /* diets1: '', diets2: '', */
    let errors={};
    if(inputs.name.length < 1) errors.name = "This field is required";
    if(inputs.name.length > 100) errors.name = "This name is too long";

    if(typeof(inputs.image) !== 'string') errors.image = "This value is invalid";
    if(inputs.image.length < 1) errors.image = "This field is required";

    if(inputs.summary.length < 1) errors.summary = "This field is required";
    if(inputs.summary.length > 250) errors.summary = "This summary is too long";

    if(inputs.healthScore < 1) errors.healthScore = "The health score has to be greater than 0";
    if(inputs.healthScore > 100) errors.healthScore = "The health score has to be equal to or less than 100";

    if(inputs.instructions.length < 1) errors.instructions = "This field is required";
    if(inputs.instructions.length > 300) errors.instructions = "This instruction is too long";

    if(inputs.diets1 === '') errors.diets1 = "This field is required";

    if(inputs.diets2 === '') errors.diets2 = "This field is required";

    return errors;
}