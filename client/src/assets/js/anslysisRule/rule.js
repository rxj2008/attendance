import preproccess from './preproccess'
import overtime from './overtime'
import reimburse from './reimburse'

class Rule {
  constructor() {
    this.plugins = []
  }
  register(name, plugin) {
    this.plugins.push({
      name,
      plugin
    })
  }
  run(record, options) {
    let result = record
    this.plugins.forEach(({
      plugin
    }) => {
      result = plugin(record)
    })
    return result
  }
}

var rule = new Rule()
rule.register('preproccess', preproccess)
rule.register('overtime', overtime)
rule.register('reimburse', reimburse)

export default function (record) {
  return rule.run(record)
}
