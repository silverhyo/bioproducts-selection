import React, { useLayoutEffect } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
//import Style css
import "./Filtering_V1.css";
// import Components
import BioProductsFiltered from '../BioProductsFiltered/BioProductsFiltered';
// import useContext
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';
import { JsonDataContext } from '../../../Context/JsonDataContext';

export default function Filtering_V1() {

  // 아래는 Bioproducts Component로부터 전달받은 props
  const imageURL = useContext(ImageAddressContext).imageURL;
  const URL = useContext(WebInformation).URL;
  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData;
  const jsonData01 = useContext(JsonDataContext).jsonData01;

  console.log("[Filtering_V1]-URL :", URL);

  const [filteredProducts, setFilteredProducts] = useState(productsDataBase || []);
  
  // 01. Filter가 적용된 Products를 BioProductsFiltered에 Props로 전달해야 함, 처음엔 모든 아이템이 보여야 함
  useEffect(() => {
    if (productsDataBase) {
      setFilteredProducts(productsDataBase)
    }
  },[productsDataBase]);
  console.log("filteredProducts :", filteredProducts);



  // 02. 자 이제 Select의 Option 사항에 따라 Filtering을 해보자. 먼저 Product Type
  //! 매우 중요 : 배열 분리, 제거 (아래서 ProductType은 Database에 포함되어야 한다..)
  // TODO 나중에 function으로 만들고 select 함수랑 엮기기
  let productTypeOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ProductType
    );
  });
  let newProductTypeOptionArr = productTypeOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewProductTypeOptionArr = [...new Set(newProductTypeOptionArr)];
  let sortFinalNewProductTypeOptionArr = finalNewProductTypeOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewProductTypeOptionArr ;", sortFinalNewProductTypeOptionArr)


  // TODO Modality로 중복, null 제거 / 분리
  let productModalityOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ProductModality
    );
  });
  let newProductModalityOptionArr = productModalityOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewProductModalityOptionArr = [...new Set(newProductModalityOptionArr)];
  let sortFinalNewProductModalityOptionArr = finalNewProductModalityOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewProductModalityOptionArr ;", sortFinalNewProductModalityOptionArr)


   // TODO CellLine 중복, null 제거 / 분리
  let productCellLineOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ProductCellLine
    );
  });
  let newProductCellLineOptionArr = productCellLineOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewProductCellLineOptionArr = [...new Set(newProductCellLineOptionArr)];
  let sortFinalNewProductCellLineOptionArr = finalNewProductCellLineOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewProductCellLineOptionArr ;", sortFinalNewProductCellLineOptionArr)


  // TODO Filtration 중복, null 제거 / 분리
  let productFiltrationOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ProductFiltration
    );
  });
  let newProductFiltrationOptionArr = productFiltrationOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewProductFiltrationOptionArr = [...new Set(newProductFiltrationOptionArr)];
  let sortFinalNewProductFiltrationOptionArr = finalNewProductFiltrationOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewProductFiltrationOptionArr ;", sortFinalNewProductFiltrationOptionArr)


  // TODO Service 중복, null 제거 / 분리
  let serviceOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ServiceType
    );
  });
  let newServiceOptionArr = serviceOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewServiceOptionArr = [...new Set(newServiceOptionArr)];
  let sortFinalNewServiceOptionArr = finalNewServiceOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewServiceOptionArr ;", sortFinalNewServiceOptionArr)


  // TODO Manufacture 중복, null 제거 / 분리
  let productManufacturerOptionArr = filteredProducts.map(filteredProduct => {
    return (
      filteredProduct.ProductManufacturer
    );
  });
  let newProductManufacturerOptionArr = productManufacturerOptionArr
    .filter(item => item != null) // null 값 제거
    .flatMap(item => item.split(',')) // 쉽표로 분리
    .filter(item => item.trim() != ''); // 빈문자열 제거
  let finalNewProductManufacturerOptionArr = [...new Set(newProductManufacturerOptionArr)];
  let sortFinalNewProductManufacturerOptionArr = finalNewProductManufacturerOptionArr.sort(); // 알파벳 순서대로 정열
  console.log("sortFinalNewProductManufacturerOptionArr ;", sortFinalNewProductManufacturerOptionArr)


  // ! 03 : Filtering 구현 위한 조건
  // FORM 제출 시 Filtering
  function handleSubmit(event) {
    event.preventDefault();
    let valueFilter = event.target;
    let originalData = productsDataBase;
    originalData = productsDataBase.filter(datum => {
      if(valueFilter.productType?.value !== '') {
        if(!datum.ProductType?.includes(valueFilter.productType.value)) {  //productType은 <select> tag안의 name 값이며, 같은 name값을 가지는 tag안에서의 value값 
          return false;
        }
      }

      if(valueFilter.productModality?.value !== '') {
        if(!datum.ProductModality?.includes(valueFilter.productModality.value)) { // '?'의 기능은?
          return false;
        }
      }

      if(valueFilter.productCellLine?.value !== '') {
        if(!datum.ProductCellLine?.includes(valueFilter.productCellLine.value)) {
          return false;
        }
      }
      
      if(valueFilter.productFiltration?.value !== '') {
        if(!datum.ProductFiltration?.includes(valueFilter.productFiltration.value)) {
          return false;
        }
      }

      if(valueFilter.services?.value !== '') {
        if(!datum.ServiceType?.includes(valueFilter.services.value)) {
          return false;
        }
      }

      if(valueFilter.productManufacturer?.value !== '') {
        if(!datum.ProductManufacturer?.includes(valueFilter.productManufacturer.value)) {
          return false;
        }
      }

      // 대소문자 구별없이 찾기 위해서는 아래와 같이 toLowerCase() 함수를 사용한다!!!
      if(valueFilter.productName?.value.toLowerCase() !== '') {
        if(!datum.ProductName?.toLowerCase().includes(valueFilter.productName.value.toLowerCase())) {
          return false;
        }
      }

      return true;

      
    })
    setFilteredProducts(originalData);
  };


  // FilteredProducts에서 Select의 Option 구성이 변경되어야 함


  // Select Option 항목을 Map 함수 진행하기 위해 중복되는 것 제거



  // 10. Select에서 Option 선택시 자동 Click 함수 적용시켜보자!
  
  const [quantityOfCellLine, setQuantityOfCellLine] = useState('');
  function firstSelectFilter() {
    document.getElementById('submit').click();
  }
  function secondSelectFilter() {
    document.getElementById('submit').click();
  }
  function cellLineSelectFilter() {
    document.getElementById('submit').click();
  }
  function filtrationSelectFilter() {
    document.getElementById('submit').click();
  }
  function manufacturerSelectFilter() {
    document.getElementById('submit').click();
  }
  function searchFilter(targetValue) {
    setSearchValue(targetValue);
    document.getElementById('submit').click();
  }
  function serviceSelectFilter() {
    document.getElementById('submit').click();
  }



  // ! Filtering에서 Option 항목이 1개만 있을 때 Select Element를 숨기고자 함. 관련 있는 분류만 남겨 놓고자 함
  // * 설명 : 서로 연관이 없을 경우 option의 내용은 '' 이렇게 하나만 나온다. 이 경우 이것을 안보이게 하는 것이다.
  useEffect (() => {
    let divOfProductType = document.querySelector('.classProductType');
    let numberOfProductTypeOption = document.querySelectorAll('.optionProductType').length;
    if(numberOfProductTypeOption === 1) {
      divOfProductType.style.display = 'none';
    } else {
      divOfProductType.style.display = 'flex';
    }

    let divOfModality = document.querySelector('.classModality');
    let numberOfModality = document.querySelectorAll('.optionModality').length;
    if(numberOfModality === 1) {
      divOfModality.style.display = 'none';
    } else {
      divOfModality.style.display = 'flex';
    }

    let divOfCellLine = document.querySelector('.classCellLine');
    let numberOfCellLineOption = document.querySelectorAll('.optionCellLine').length;
    if(numberOfCellLineOption === 1) {
      divOfCellLine.style.display = 'none';
    } else {
      divOfCellLine.style.display = 'flex';
    }

    let divOfFiltration = document.querySelector('.classFiltration');
    let numberOfFiltration = document.querySelectorAll('.optionFiltration').length;
    if(numberOfFiltration === 1) {
      divOfFiltration.style.display = 'none';
    } else {
      divOfFiltration.style.display = 'flex';
    }

    let divOfService = document.querySelector('.classService');
    let numberOfService = document.querySelectorAll('.optionService').length;
    if(numberOfService === 1) {
      divOfService.style.display = 'none';
    } else {
      divOfService.style.display = 'flex';
    }

    let divOfManufacturer = document.querySelector('.classManufacturer');
    let numberOfManufacturer = document.querySelectorAll('.optionManufacturer').length;
    if(numberOfManufacturer === 1) {
      divOfManufacturer.style.display = 'none';
    } else {
      divOfManufacturer.style.display = 'flex';
    }

  },[filteredProducts])




  // 검색 input에서 Reset Button Click 시 input 창의 검색어는 Clear 된다.
  const [searchValue, setSearchValue] = useState();
  function handleClear() {
      setSearchValue('');
  };

  function handleReset() {
    window.location.reload();
  }




  return (
    <div className='Filtering_V1_Container'>
      <div className='Filtering_V1_Container_Box'>
        <form className='Filtering_V1_Container_Box_Form' onSubmit={handleSubmit}>
          <div className='Filtering_V1_Container_Box_Form_Filtering'>
            

            {/* PRODUCT TYPE */}
            {/* 아래 다른 분류로 추가할 경우 변경해야 할 부분 : label(htmlFor, textNode), select(id, name, onChange함수), option(없음), Map 함수(jsonData01이후 정확한 데이터 선택택)  */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classProductType'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="productType">Product Type을 선택해 주세요</label>
              <select id="productType" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="productType" onChange={firstSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionProductType' value="">Select...</option>
                {sortFinalNewProductTypeOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionProductType' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>


            {/* PRODUCT MODALITY */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classModality'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="productModality">Modality를 선택해 주세요</label>
              <select id="productModality" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="productModality" onChange={secondSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionModality' value="">Select...</option>
                {sortFinalNewProductModalityOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionModality' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>


            {/* CELL LINE */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classCellLine'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="productCellLine">Cell Line을 선택해 주세요</label>
              <select id="productCellLine" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="productCellLine" onChange={cellLineSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionCellLine' value="">Select...</option>
                {sortFinalNewProductCellLineOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionCellLine' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>


            {/* FILTRATION */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classFiltration'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="productFiltration">Filtration 목적을 선택해 주세요</label>
              <select id="productFiltration" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="productFiltration" onChange={filtrationSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionFiltration' value="">Select...</option>
                {sortFinalNewProductFiltrationOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionFiltration' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>

            {/* Service */}
            {/* 아래 다른 분류로 추가할 경우 변경해야 할 부분 : label(htmlFor, textNode), select(id, name, onChange함수), option(없음), Map 함수(jsonData01이후 정확한 데이터 선택택)  */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classService'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="services">Service를 선택해 주세요</label>
              <select id="services" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="services" onChange={serviceSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionService' value="">Select...</option>
                {sortFinalNewServiceOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionService' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>


            


            {/* MANUFACTURER */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Query01 classManufacturer'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Query01_Label' htmlFor="productManufacturer">Manufacturer를 선택해 주세요</label>
              <select id="productManufacturer" className='Filtering_V1_Container_Box_Form_Filtering_Query01_Select' name="productManufacturer" onChange={manufacturerSelectFilter}>
                <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionManufacturer' value="">Select...</option>
                {sortFinalNewProductManufacturerOptionArr.map((item, index) => {
                  return (
                    <option className='Filtering_V1_Container_Box_Form_Filtering_Query01_Options optionManufacturer' key={item} value={item}>{item}</option>
                  )
                })}
              </select>
            </div>


            {/* SEARCH : PRODUXT NAME */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Search'>
              <label className='Filtering_V1_Container_Box_Form_Filtering_Search_Label' htmlFor="search">제품명을 입력해 주세요</label>
              <div className='Filtering_V1_Container_Box_Form_Filtering_Search_Box'>
                <input id="search" type="search" className='Filtering_V1_Container_Box_Form_Filtering_Search_Input' value={searchValue} name="productName" placeholder="Search Product..." onChange={(e) => searchFilter(e.target.value)}></input>
                <button className='Filtering_V1_Container_Box_Form_Filtering_Search_Button' onClick={handleClear}>Reset</button>
              </div>
            </div>

            {/* SEARCH : PRODUXT NAME */}
            <div className='Filtering_V1_Container_Box_Form_Filtering_Reset'>
              <div className='Filtering_V1_Container_Box_Form_Filtering_Reset_Box'>
                <button className='Filtering_V1_Container_Box_Form_Filtering_Reset_Button' onClick={handleReset}>Reset</button>
              </div>
            </div>
            


          </div>

          <input className='Filtering_V1_Container_Box_Form_Filtering_Button' id="submit" type="submit" value="SEARCH"></input>
        </form>

        <div className='Filtering_V1_Container_Box_Count'>
          <div className='Filtering_V1_Container_Box_Count_Text'><strong style={{color:"orange"}}>{filteredProducts.length}</strong>개의 제품을 찾았어요</div>
        </div>
    
      </div>
      <BioProductsFiltered FILTEREDPRODUCTS={filteredProducts} />
    </div>
    
  )
}
