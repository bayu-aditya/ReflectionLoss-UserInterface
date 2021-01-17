const apiHost = "https://azwaradam.com/api"
// const apiHost = "http://kvm1.weeber.id:5000/api"

export const apiUrl = {
  simulation: {
    calculate: apiHost + "/calculate/simulation",
  },
  experiment: {
    data: apiHost + "/data",
    calculate: apiHost + "/calculate/experiment",
  }
}
