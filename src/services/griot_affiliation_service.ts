/**
 * Author: Styves
 * this javaScript file contains all the affiliations functions.
 * date: 20/11/2023
 */

const uriAffiliations = import.meta.env.VITE_APP_DOMAIN_GRIOT_DATA_BASE + 'affiliations'
export const createsAffiliationsRequest = (request: any) => {
  return fetch(`${uriAffiliations}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}
export const getAffiliates = (pageNumber: number, pageSize: number) => {
  return fetch(`${uriAffiliations}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

export const updateAffiliateRequest = (id: string, request: any) => {
  return fetch(`${uriAffiliations}/${id}/approve`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}
export const getAffiliateUserInfo = (uid: any) => {
  return fetch(`${uriAffiliations}/${uid}/info`)
}
export const getAffiliateUser = (id: string) => {
  return fetch(`${uriAffiliations}/${id}`)
}

export const updateAffiliateInfo = (id: string, request: any) => {
  return fetch(`${uriAffiliations}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
}

/** this function is used to delete question in databases*/
export const deleteAffiliate = (id: string) => {
  return fetch(`${uriAffiliations}/${id}`, {
    method: 'DELETE',
  })
}

export const getAffiliateUserMonthStat = (id: string, pageNumber: number, pageSize: number) => {
  return fetch(`${uriAffiliations}/${id}/stat?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}
