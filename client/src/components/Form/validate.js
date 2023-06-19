const validate = (input) => {
    let errors = {};
    if (!input.name || !/^[a-zA-Z\s]*$/.test(input.name) || input.name.length < 3 || input.name.length >= 25) errors.name = 'Must contain 3 to 25 characters, letters only'; //Name of activity is required o invalid
    if (!input.difficulty) errors.difficulty = 'Difficulty is required';
    if (!input.duration) errors.duration = 'Duration is required';
    if (!input.season) errors.season = 'Season is required';
    if (input.countryId.length < 1) errors.countryId = 'Must select at least 1 Country';
    return errors;
}

export default validate;