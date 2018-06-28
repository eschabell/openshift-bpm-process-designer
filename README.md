Update: June 2018 moved to [Github](https://gitlab.com/eschabell/openshift-bpm-process-designer)


JBoss BPM Process Designer on OpenShift 
===========================================
Installing the JBoss BPM Web Process Designer standalone on OpenShift was never easier!

This git repository helps you get up and running quickly with the jBPM
Migration Tooling as integrated with the Web Designer.


Install with one click
----------------------
[![Click to install OpenShift](http://launch-shifter.rhcloud.com/launch/light/Click to install.svg)](https://openshift.redhat.com/app/console/application_type/custom?&cartridges[]=jbossas-7&initial_git_url=https://github.com/eschabell/openshift-bpm-process-designer.git&name=designer)


Manutal install on OpenShift
----------------------------
Create a JBoss AS application

    rhc app create -t jbossas-7 --from-code git://github.com/eschabell/openshift-bpm-process-designer.git designer

That's it, you can now checkout your application at:

    http://designer-$your_domain.rhcloud.com     

Just follow the link provided to the designer login:

    http://designer-$your_domain.rhcloud.com/designer

    Login credentials

           user: erics

       password: erics

Note: each restart of the server will re-initialize the git repository that the designer is using, to keep your git repository backend for your designer see the comments in file:

    .openshift/action_hooks/pre_start_jbossas-7

Releases
---------

- v1.4 running on JBoss AS 7.1, standalone web process designer master product branch and one click install button.

- v1.3 running on JBoss AS 7.1, standalone web process designer master product branch.

- v1.2 running on JBoss AS 7.1, standalone web process designer v6.0.x product branch.

- v1.1 running on JBoss AS 7.1, standalone web process designer v6.

- v1.0 running on JBoss EAP 6.0, standalone web process designer 2.5.

