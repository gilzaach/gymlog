// Starter set. Replace/extend with free-exercise-db (~800 exercises) later.
const EX=[['bench','Bench Press','Жим лежачи','chest'],['incline','Incline Dumbbell Press','Жим гантелей на похилій','chest'],['fly','Cable Fly','Зведення в кросовері','chest'],['pushup','Push-up','Віджимання','chest'],['dip','Dip','Віджимання на брусах','chest'],
['row','Barbell Row','Тяга штанги в нахилі','back'],['pullup','Pull-up','Підтягування','back'],['latpd','Lat Pulldown','Тяга верхнього блоку','back'],['cabrow','Seated Cable Row','Тяга нижнього блоку','back'],['deadlift','Deadlift','Станова тяга','back'],
['squat','Squat','Присідання','legs'],['smithsq','Smith Machine Squat','Присідання у Сміті','legs'],['legpress','Leg Press','Жим ногами','legs'],['rdl','Romanian Deadlift','Румунська тяга','legs'],['lunge','Lunge','Випади','legs'],['legcurl','Leg Curl','Згинання ніг','legs'],['legext','Leg Extension','Розгинання ніг','legs'],['calf','Calf Raise','Підйом на носки','legs'],
['ohp','Overhead Press','Жим стоячи','shoulders'],['lat','Lateral Raise','Махи в сторони','shoulders'],['rear','Rear Delt Fly','Махи на задню дельту','shoulders'],
['curl','Biceps Curl','Згинання на біцепс','arms'],['hammer','Hammer Curl','Молоткові згинання','arms'],['pushdn','Triceps Pushdown','Розгинання на блоці','arms'],['skull','Skull Crusher','Французький жим','arms'],
['plank','Plank','Планка','core'],['crunch','Crunch','Скручування','core'],['legrs','Hanging Leg Raise','Підйом ніг у висі','core']]
.map(([id,en,uk,m])=>({id,n:{en,uk},m}));
