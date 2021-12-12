const createAutoComplete=({root,renderOption,onOptionSelect,inputValue,fetchData})=>{
root.innerHTML=`
<label><b>Search</b></label>
<input class='input' placeholder="Enter Movie Name"/>
<div class="dropdown">
<div class="dropdown-menu">
    <div class="dropdown-content results"></div>
</div>
</div>
`;
const input=root.querySelector('input')
const dropdown=root.querySelector('.dropdown')
const resultsWrapper=root.querySelector('.results')

const onInput=async event=>{
 const items=await fetchData(event.target.value);
if(!items.length){
    dropdown.classList.remove('is-active');
    return;
}
 resultsWrapper.innerHTML="";   //clearing dropdown search for new input
 dropdown.classList.add('is-active')   //opens dropdown

 for(let item of items){
       const option=document.createElement('a')
       option.classList.add('dropdown-item')
     
       option.innerHTML=renderOption(item);
  option.addEventListener('click',()=>{
      dropdown.classList.remove('is-active'); // to remove dropdown after clicking on any item in dropdown
      input.value = inputValue(item);  // to update text in input
    onOptionSelect(item);
    })

       resultsWrapper.appendChild(option)
  };
};
input.addEventListener('input',debounce(onInput,500))


//closing dropdown after clicking on anywhere except dropdown
document.addEventListener('click',event=>{
if(!root.contains(event.target)){
    dropdown.classList.remove('is-active')
}
});
}