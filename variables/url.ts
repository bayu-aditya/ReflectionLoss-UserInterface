// const apiHost = "https://azwaradam.com/api"
const apiHost = "http://kvm1.weeber.id:5000/api"

export const apiUrl = {
  simulation: {
    data: apiHost + "/data/simulation",
    calculate: apiHost + "/calculate/simulation",
    calculateWithData: apiHost + "/calculate/simulation-with-data"
  },
  experiment: {
    data: apiHost + "/data/experiment",
    calculate: apiHost + "/calculate/experiment",
  }
}
