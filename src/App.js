import { useState } from 'react'
import medCondObj from './dat/ailments'

const Ailment = () => {
  const cssList = 'inline-block m-2 px-5 py-1 rounded-full border border-black border-solid cursor-pointer bg-white hover:bg-blue-400'
  const toObjKey = (x) => x.split(" ").join("--").toLowerCase()
  let optionDefaultValue = false
  
  const isSelected = (e) => {
    optionDefaultValue = !optionDefaultValue
    if(optionDefaultValue) {
      e.target.className = `bg-black text-white ${cssList}`
    }
    else{
      e.target.className = `${cssList}`
    }
  }

  return Object.keys(medCondObj).map((el,i) => {
    return <span onClick={isSelected} className={cssList} key={i} id={toObjKey(el)}>{medCondObj[el].name}</span>
  })
}

const App =()=> {
  const [ firstName , setFirstName] = useState('')
  const [ lastName , setLastName] = useState('')
  const [ birthDay , setBirthDay] = useState('')
  const [ sex , setSex] = useState('other')
  const [ contactDetail , setContactDetail] = useState({})
  const [ physicalAttr , setPhysicalAttr] = useState({})
  //const [ medicalCondition, setMedicalCondition ] = useState({})

  const handleChange = (fn) => {
    return (e) => {
      fn(e.target.value)
    }
  }

  return (
    <>
    <h1 className="font-sans">Form</h1>
    <form className='p-10'>
      <h2>Bio</h2>
      <div className='flex gap-2 m-2'>
        <input value={firstName} placeholder="First Name" onChange={handleChange(setFirstName)}/>
        <input value={lastName} placeholder="Last Name" onChange={handleChange(setLastName)}/>
        <input type="date" value={birthDay} placeholder="Last Name" onChange={handleChange(setBirthDay)}/>
        <select name="sex" id="selectSex" defaultValue={sex} onChange={handleChange(setSex)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Select Gender</option>
        </select>
      </div>
      <h2>Contact</h2>
      <div className='flex gap-2 m-2'>
        <input name = "address" type = "address" placeholder="Mailing Address" onChange={(e) => setContactDetail({...contactDetail, mailAddress: e.target.value})}/>
      </div>
      <div className='flex gap-2 m-2'>
        <input name="telephone" type="tel" placeholder="Contact Number" onChange={(e) => setContactDetail({...contactDetail, contactNumber: e.target.value})}/>
        <input name="email" type="email" placeholder="Email" onChange={(e) => setContactDetail({...contactDetail, emailAddress: e.target.value})}/>
      </div>
      <div className='flex gap-2 m-2'>
        <input name="height" type="number" placeholder="Height in cm" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyHeight: e.target.value})}/>
        <input name="weight" type="number" placeholder="Weight in Kg" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyWeight: e.target.value})}/>
        <input name="bloodType" type="text" placeholder="Blood Type" onChange={(e) => setPhysicalAttr({...physicalAttr, bloodType: e.target.value})}/>
      </div>
      <h2>Medical History</h2>
      <div className='flex-wrap'>
        <Ailment />
      </div>
    </form>
    </>
  );
}

export default App;
