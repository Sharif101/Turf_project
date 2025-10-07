const nameFromDivisionId = (divisionId, divisionArray) => {
    if (divisionId !== '0') {
        let div = divisionArray.filter((item) => item.id === String(divisionId))
        return div[0]?.name
    }
    return 0
}

const nameFromDistrictId = (districtId, districtArray) => {
    if (districtId !== '0') {
        let dis = districtArray.filter((item) => item.id === districtId)
        return dis[0]?.name
    }
    return 0
}

const nameFromUpazilaId = (upazilaId, upazilaArray) => {
    if (upazilaId !== '0') {
        let upz = upazilaArray.filter((item) => item.id === upazilaId)
        return upz[0]?.name
    }
    return 0
}

const postOfficeFromPostCode = (postCode, postCodeArray) => {
    if (postCode !== '0') {
        let pst = postCodeArray.filter((item) => item.postCode === postCode)
        return pst[0]?.postOffice
    }
    return 0
}

export { nameFromDivisionId, nameFromDistrictId, nameFromUpazilaId, postOfficeFromPostCode }
