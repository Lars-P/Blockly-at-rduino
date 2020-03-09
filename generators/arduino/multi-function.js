/**
 * Visual Blocks Language
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.multifunction');

goog.require('Blockly.Arduino');

Blockly.Arduino.multifunction_buildin_led = function() {
  var dropdown_stat = this.getFieldValue('STAT');
  var dropdown_DEL = this.getFieldValue('DEL');
  Blockly.Arduino.setups_['setup_buildin_LED_' + dropdown_DEL] = 'pinMode(' + dropdown_DEL + ', OUTPUT);';
  var code = 'digitalWrite(' + dropdown_DEL + ', ' + '!' + dropdown_stat + ');\n';
  return code;
};

Blockly.Arduino.multifunction_digital_read = function() {
  var dropdown_BP = this.getFieldValue('BP');
  var code = 'digitalRead(' + dropdown_BP + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.multifunction_pot_read = function() {
  var code = 'analogRead(A0)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.multifunction_analog_read = function() {
  var code = 'analogRead(A5)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.multifunction_tone = function() {
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var value_tps = Blockly.Arduino.valueToCode(this, 'TPS', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_multifunction_buzzer'] = 'pinMode(3, OUTPUT);';
  var code = 'tone(3,'+value_num+','+value_tps+');\n';
  return code;
};

Blockly.Arduino.multifunction_notone = function() {
  Blockly.Arduino.setups_['setup_multifunction_buzzer'] = 'pinMode(3, OUTPUT);';
  var code = 'noTone(3);\n';
  return code;
};

Blockly.Arduino.multifunction_segment = function() {
  var value_num1 = Blockly.Arduino.valueToCode(this, 'NUM1', Blockly.Arduino.ORDER_ATOMIC);
  var value_num2 = Blockly.Arduino.valueToCode(this, 'NUM2', Blockly.Arduino.ORDER_ATOMIC);
  var value_num3 = Blockly.Arduino.valueToCode(this, 'NUM3', Blockly.Arduino.ORDER_ATOMIC);
  var value_num4 = Blockly.Arduino.valueToCode(this, 'NUM4', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.includes_['define_multifunction_segments'] = '#include <TimerOne.h>\n' +
  '#include <MultiFuncShield.h>';
  Blockly.Arduino.definitions_['definition_multifunction_segments'] = '';
  Blockly.Arduino.setups_['setup_multifunction_segments'] = 'Timer1.initialize();\n' +
  '  MFS.initialize(&Timer1);\n';
    var code = 'WriteNumber(' + value_num1 + ' * 1000 + ' + value_num2 + ' * 100 + ' + value_num3 + ' * 10 + ' + value_num4 + ');\n';
  return code;
};

Blockly.Arduino.multifunction_segment_number = function() {
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.includes_['define_multifunction_segments'] = '#include <TimerOne.h>\n' +
  '#include <MultiFuncShield.h>';
  Blockly.Arduino.definitions_['definition_multifunction_segments'] = '';
  Blockly.Arduino.setups_['setup_multifunction_segments'] = 'Timer1.initialize();\n' +
  '  MFS.initialize(&Timer1);\n';
  var code = 'MFS.write(' + value_num + ');\n';
  return code;
};
Blockly.Arduino.multifunction_PWM_write = function() {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.setups_['setup_output'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
  var code = 'analogWrite(' + dropdown_pin + ', ' + value_num + ');\n';
  return code;
};