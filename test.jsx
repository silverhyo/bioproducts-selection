Resources:
  EC2CPUUtilizationAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: {"Fn::Join": ["", [{"Ref": "AWSEBEnvironmentName"}, " CPU Utilization"]]}
      AlarmDescription: {"EC2 CPU Alarm"}
      Namespace: AWS/EC2
      MetricName: CPUUtilization
      Dimensions:
        - Name: AutoScalingGroupName
          Value: {Ref: AWSEBAutoScalingGroup}
      Statistic: Average
      Period: 70
      EvaluationPeriods: 3
      Threshold: {"60.0"}
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - "sns-arn"